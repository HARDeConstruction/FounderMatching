from rest_framework import serializers
from .models import (
    Profile, Experience, Certificate,
    Achievement, ProfilePrivacySettings, Countries,
    Tags, ProfileTagInstances, JobPosition, JobPositionTagInstances
)
from datetime import datetime
import re
import os

class ModelSerializer(serializers.ModelSerializer):
    """Base serializer that preserves the exact field names from the model"""
    def to_representation(self, instance):
        return super().to_representation(instance)

    def to_internal_value(self, data):
        return super().to_internal_value(data)

class ProfilePreviewCardSerializer(ModelSerializer):
    tags = serializers.SerializerMethodField()
    occupation = serializers.CharField(source='industry')
    avatar = serializers.SerializerMethodField()

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

    def get_avatar(self, obj):
        avatar_number = self.context.get('avatar_number')
        if avatar_number is not None and obj.avatar:
            return str(avatar_number)
        return None

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
    experiences = ExperienceSerializer(many=True, required=False, read_only=True)
    certificates = CertificateSerializer(many=True, required=False, read_only=True)
    achievements = AchievementSerializer(many=True, required=False, read_only=True)
    jobPositions = JobPositionSerializer(many=True, required=False, read_only=True, source='jobpositions')
    privacySettings = ProfilePrivacySettingsSerializer(source='profileprivacysettings', required=False)
    dateOfBirth = serializers.CharField(required=False, allow_null=True)
    tags = serializers.SerializerMethodField()
    avatar = serializers.DictField(required=False, write_only=True)
    avatar_file = serializers.CharField(required=False, write_only=True)

    class Meta:
        model = Profile
        fields = [
            'profileID', 'userID', 'isStartup', 'name', 'email',
            'industry', 'phoneNumber', 'country', 'city',
            'linkedInURL', 'slogan', 'websiteLink',
            'avatar', 'avatar_file', 'avatarFileType', 'description', 'hobbyInterest',
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
            'avatarFileType': {'read_only': True},
        }

    def get_tags(self, instance):
        return [tag_instance.tagID.value for tag_instance in instance.tags.all()]

    def validate_avatar(self, value):
        if not value:
            return None

        if not isinstance(value, dict):
            raise serializers.ValidationError("Avatar must be a dictionary with path and relativePath")

        path = value.get('path')
        if not path:
            raise serializers.ValidationError("Avatar path is required")

        _, ext = os.path.splitext(path)
        if not ext:
            raise serializers.ValidationError("Avatar file must have an extension")
        ext = ext[1:].lower()

        valid_extensions = ['jpg', 'jpeg', 'png', 'gif']
        if ext not in valid_extensions:
            raise serializers.ValidationError(f"Invalid file extension. Allowed extensions are: {', '.join(valid_extensions)}")

        return value

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
        avatar_data = validated_data.pop('avatar', None)
        avatar_file = validated_data.pop('avatar_file', None)

        # Handle avatar file type
        if avatar_data and 'path' in avatar_data:
            _, ext = os.path.splitext(avatar_data['path'])
            if ext:
                validated_data['avatarFileType'] = ext[1:].lower()

        # Set avatar binary data if provided
        if avatar_file:
            validated_data['avatar'] = avatar_file

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