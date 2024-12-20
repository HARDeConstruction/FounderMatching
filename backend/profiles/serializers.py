from rest_framework import serializers
from .models import (
    Profile, Experience, Certificate,
    Achievement, ProfilePrivacySettings, Countries,
    Tags, ProfileTagInstances, JobPosition, JobPositionTagInstances
)
from datetime import datetime
import re
import os
import base64

class ModelSerializer(serializers.ModelSerializer):
    """Base serializer that preserves the exact field names from the model"""
    def to_representation(self, instance):
        return super().to_representation(instance)

    def to_internal_value(self, data):
        return super().to_internal_value(data)

class ProfilePreviewCardSerializer(ModelSerializer):
    tags = serializers.SerializerMethodField()
    occupation = serializers.CharField(source='industry')

    class Meta:
        model = Profile
        fields = ['profileID', 'isStartup', 'name', 'occupation', 'avatar', 'tags']
        extra_kwargs = {
            'profileID': {'read_only': True},
            'isStartup': {'read_only': True},
            'name': {'read_only': True},
        }

    def get_tags(self, obj):
        try:
            return [tag_instance.tagID.value for tag_instance in obj.tags.all()]
        except Exception:
            return []

class ExperienceSerializer(ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'companyName', 'role', 'location',
            'description', 'startDate', 'endDate'
        ]
        extra_kwargs = {
            'startDate': {'required': True},
            'endDate': {'required': False},
        }

class CertificateSerializer(ModelSerializer):
    class Meta:
        model = Certificate
        fields = [
            'name', 'skill', 'description',
            'startDate', 'endDate', 'gpa'
        ]
        extra_kwargs = {
            'name': {'required': True},
            'skill': {'required': True},
        }

class AchievementSerializer(ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['name', 'description', 'date']
        extra_kwargs = {
            'name': {'required': True},
        }

class JobPositionSerializer(ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = JobPosition
        fields = [
            'jobTitle', 'isOpening', 'country', 'city',
            'startDate', 'description', 'tags'
        ]
        extra_kwargs = {
            'jobTitle': {'required': True},
            'country': {'required': True},
        }

class ProfilePrivacySettingsSerializer(ModelSerializer):
    class Meta:
        model = ProfilePrivacySettings
        exclude = ['profileID']
        extra_kwargs = {
            'industryPrivacy': {'required': True},
            'emailPrivacy': {'required': True},
            'phoneNumberPrivacy': {'required': True},
            'countryPrivacy': {'required': True},
            'cityPrivacy': {'required': True},
            'linkedInURLPrivacy': {'required': True},
            'sloganPrivacy': {'required': True},
            'achievementPrivacy': {'required': True},
        }

class ProfileSerializer(ModelSerializer):
    experiences = ExperienceSerializer(many=True, required=False)
    certificates = CertificateSerializer(many=True, required=False)
    achievements = AchievementSerializer(many=True, required=False)
    jobPositions = JobPositionSerializer(many=True, required=False)
    privacySettings = ProfilePrivacySettingsSerializer(source='profileprivacysettings', required=False)
    dateOfBirth = serializers.CharField(required=False, allow_null=True)
    tags = serializers.SerializerMethodField()
    avatar = serializers.CharField(required=False, allow_null=True)

    class Meta:
        model = Profile
        fields = [
            'profileID', 'userID', 'isStartup', 'name', 'email',
            'industry', 'phoneNumber', 'country', 'city',
            'linkedInURL', 'slogan', 'websiteLink',
            'avatar', 'description', 'hobbyInterest',
            'gender', 'education', 'dateOfBirth',
            'currentStage', 'statement', 'aboutUs',
            'experiences', 'certificates', 'achievements',
            'jobPositions', 'privacySettings', 'tags'
        ]
        extra_kwargs = {
            'userID': {'required': True},
            'name': {'required': True},
            'email': {'required': True},
            'industry': {'required': True},
        }

    def get_tags(self, instance):
        return [tag_instance.tagID.value for tag_instance in instance.tags.all()]

    def validate_avatar(self, value):
        if not value:
            return None

        # If it's already a base64 string, validate its format
        if value.startswith('data:image/'):
            # Validate base64 format: data:image/[type];base64,[data]
            try:
                header, data = value.split(',', 1)
                if not header.startswith('data:image/') or not header.endswith(';base64'):
                    raise serializers.ValidationError("Invalid base64 image format")
                # Try to decode base64 to validate it
                try:
                    base64.b64decode(data)
                except Exception:
                    raise serializers.ValidationError("Invalid base64 encoding")
                return value
            except ValueError:
                raise serializers.ValidationError("Invalid base64 image format")

        raise serializers.ValidationError("Invalid avatar format")

    def update(self, instance, validated_data):
        # Handle nested fields
        experiences_data = validated_data.pop('experiences', None)
        certificates_data = validated_data.pop('certificates', None)
        achievements_data = validated_data.pop('achievements', None)
        job_positions_data = validated_data.pop('jobPositions', None)
        privacy_settings_data = validated_data.pop('profileprivacysettings', None)

        # Update main profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update experiences if provided
        if experiences_data is not None:
            instance.experiences.all().delete()
            for exp_data in experiences_data:
                Experience.objects.create(profileOwner=instance, **exp_data)

        # Update certificates if provided
        if certificates_data is not None:
            instance.certificates.all().delete()
            for cert_data in certificates_data:
                Certificate.objects.create(profileOwner=instance, **cert_data)

        # Update achievements if provided
        if achievements_data is not None:
            instance.achievements.all().delete()
            for ach_data in achievements_data:
                Achievement.objects.create(profileOwner=instance, **ach_data)

        # Update job positions if provided
        if job_positions_data is not None:
            instance.jobpositions.all().delete()
            for job_data in job_positions_data:
                tags_data = job_data.pop('tags', [])
                job = JobPosition.objects.create(profileOwner=instance, **job_data)
                
                for tag_value in tags_data:
                    tag, _ = Tags.objects.get_or_create(
                        value=tag_value,
                        defaults={'description': None}
                    )
                    JobPositionTagInstances.objects.create(
                        jobPositionID=job,
                        tagID=tag
                    )

        # Update privacy settings if provided
        if privacy_settings_data is not None:
            privacy_settings = instance.profileprivacysettings
            for field, value in privacy_settings_data.items():
                setattr(privacy_settings, field, value)
            privacy_settings.save()

        return instance

    def get_default_privacy_settings(self):
        return {
            'genderPrivacy': 'public',
            'industryPrivacy': 'public',
            'emailPrivacy': 'public',
            'phoneNumberPrivacy': 'public',
            'countryPrivacy': 'public',
            'cityPrivacy': 'public',
            'universityPrivacy': 'public',
            'linkedInURLPrivacy': 'public',
            'sloganPrivacy': 'public',
            'websiteLinkPrivacy': 'public',
            'certificatePrivacy': 'public',
            'experiencePrivacy': 'public',
            'hobbyInterestPrivacy': 'public',
            'educationPrivacy': 'public',
            'dateOfBirthPrivacy': 'public',
            'achievementPrivacy': 'public'
        }

    def validate_dateOfBirth(self, value):
        if value is None:
            return None

        if not re.match(r'^\d{4}-\d{2}-\d{2}$', value):
            raise serializers.ValidationError(
                "Date of birth must be in YYYY-MM-DD format"
            )
            
        try:
            date_obj = datetime.strptime(value, '%Y-%m-%d')
            return date_obj
        except ValueError:
            raise serializers.ValidationError(
                "Invalid date format. Please use YYYY-MM-DD"
            )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.dateOfBirth:
            data['dateOfBirth'] = instance.dateOfBirth.strftime('%Y-%m-%d')
        return data

    def create(self, validated_data):
        experiences_data = validated_data.pop('experiences', [])
        certificates_data = validated_data.pop('certificates', [])
        achievements_data = validated_data.pop('achievements', [])
        job_positions_data = validated_data.pop('jobPositions', [])
        privacy_settings_data = validated_data.pop('profileprivacysettings', None)
        tags_data = validated_data.pop('tags', [])

        profile = Profile.objects.create(**validated_data)

        for exp_data in experiences_data:
            Experience.objects.create(profileOwner=profile, **exp_data)

        for cert_data in certificates_data:
            Certificate.objects.create(profileOwner=profile, **cert_data)

        for ach_data in achievements_data:
            Achievement.objects.create(profileOwner=profile, **ach_data)

        for job_data in job_positions_data:
            tags_data = job_data.pop('tags', [])
            job = JobPosition.objects.create(profileOwner=profile, **job_data)
            
            for tag_value in tags_data:
                tag, _ = Tags.objects.get_or_create(
                    value=tag_value,
                    defaults={'description': None}
                )
                JobPositionTagInstances.objects.create(
                    jobPositionID=job,
                    tagID=tag
                )

        if privacy_settings_data is None:
            privacy_settings_data = self.get_default_privacy_settings()

        ProfilePrivacySettings.objects.create(
            profileID=profile,
            **privacy_settings_data
        )

        for tag_value in tags_data:
            tag, _ = Tags.objects.get_or_create(
                value=tag_value,
                defaults={'description': None}
            )
            try:
                ProfileTagInstances.objects.create(
                    profileOwnerID=profile,
                    tagID=tag
                )
            except Exception as e:
                print(f"Error creating tag {tag_value}: {str(e)}")
                continue

        return profile

    def validate(self, data):
        if data.get('isStartup'):
            if not data.get('currentStage'):
                raise serializers.ValidationError(
                    "currentStage is required for startup profiles"
                )
        
        if country := data.get('country'):
            if not Countries.objects.filter(en_short_name=country).exists():
                raise serializers.ValidationError({
                    'country': f'Country "{country}" is not valid. Please select a country from the provided list.'
                })
        
        return data