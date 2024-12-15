from rest_framework import serializers
from .models import (
    Profile, Experience, Certificate,
    Achievement, Profileprivacysettings, Countries
)

class ModelSerializer(serializers.ModelSerializer):
    """Base serializer that preserves the exact field names from the model"""
    def to_representation(self, instance):
        return super().to_representation(instance)

    def to_internal_value(self, data):
        return super().to_internal_value(data)

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

class ProfilePrivacySettingsSerializer(ModelSerializer):
    class Meta:
        model = Profileprivacysettings
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
    privacySettings = ProfilePrivacySettingsSerializer(source='profileprivacysettings', required=True)

    class Meta:
        model = Profile
        fields = [
            'userID', 'isStartup', 'name', 'email',
            'industry', 'phoneNumber', 'country', 'city',
            'linkedInURL', 'slogan', 'websiteLink',
            'avatar', 'avatarFileType', 'description', 'hobbyInterest',
            'gender', 'education', 'dateOfBirth',
            'currentStage', 'experiences', 'certificates',
            'achievements', 'privacySettings'
        ]
        extra_kwargs = {
            'userID': {'required': True},
            'name': {'required': True},
            'email': {'required': True},
            'industry': {'required': True},
        }

    def create(self, validated_data):
        experiences_data = validated_data.pop('experiences', [])
        certificates_data = validated_data.pop('certificates', [])
        achievements_data = validated_data.pop('achievements', [])
        privacy_settings_data = validated_data.pop('profileprivacysettings')

        # Create the profile
        profile = Profile.objects.create(**validated_data)

        # Create related objects
        for exp_data in experiences_data:
            Experience.objects.create(profileOwner=profile, **exp_data)

        for cert_data in certificates_data:
            Certificate.objects.create(profileOwner=profile, **cert_data)

        for ach_data in achievements_data:
            Achievement.objects.create(profileOwner=profile, **ach_data)

        # Create privacy settings
        Profileprivacysettings.objects.create(
            profileID=profile,
            **privacy_settings_data
        )

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