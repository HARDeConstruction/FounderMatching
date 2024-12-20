from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.db import transaction
from django.core.files.base import ContentFile
from django.http import HttpResponse
from .serializers import ProfileSerializer, ProfilePreviewCardSerializer
from .models import Profile, UserAccount, ProfilePrivacySettings, Connection
from django.core.exceptions import ValidationError
from accounts.middlewares import JWTAuthenticationMiddleware
import json
import base64
import logging
import os
import tempfile
import mimetypes
from django.db.models import Q

logger = logging.getLogger(__name__)

class CreateProfileView(APIView):
    authentication_classes = [JWTAuthenticationMiddleware]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def validate_avatar_file(self, file):
        if not file:
            return None

        # Check file size (2MB = 2097152 bytes)
        if file.size > 2097152:
            raise ValidationError("Avatar file size must be less than 2MB")

        # Read file data and encode to base64
        file_data = file.read()
        return base64.b64encode(file_data)

    @transaction.atomic
    def post(self, request):
        try:
            try:
                user_account = UserAccount.objects.get(clerkUserID=request.user.username)
                user_id = user_account.userID
            except UserAccount.DoesNotExist:
                return Response(
                    {'error': 'User account not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            profile_data = json.loads(request.data.get('ProfileInfo', '{}'))
            profile_data['userID'] = user_id

            # Handle avatar file
            avatar_file = request.FILES.get('avatar')
            if avatar_file:
                try:
                    avatar_data = self.validate_avatar_file(avatar_file)
                    if avatar_data:
                        profile_data['avatar'] = avatar_data
                        _, ext = os.path.splitext(avatar_file.name)
                        if ext:
                            profile_data['avatarFileType'] = ext[1:].lower()
                except ValidationError as e:
                    return Response(
                        {'error': str(e)},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            serializer = ProfileSerializer(data=profile_data)
            if serializer.is_valid():
                profile = serializer.save()
                return Response(
                    {'message': 'Profile created successfully.'},
                    status=status.HTTP_200_OK
                )
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        except ValidationError as e:
            logger.error(f"Validation error: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except json.JSONDecodeError as e:
            logger.error(f"JSON decode error: {str(e)}")
            return Response(
                {'error': 'Invalid JSON data'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetUserProfilesView(APIView):
    authentication_classes = [JWTAuthenticationMiddleware]

    def get(self, request):
        try:
            try:
                user_account = UserAccount.objects.get(clerkUserID=request.user.username)
                user_id = user_account.userID
            except UserAccount.DoesNotExist:
                return Response(
                    {'error': 'User account not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            profiles = (
                Profile.objects.filter(userID=user_id)
                .prefetch_related('tags__tagID')
                .only(
                    'profileID', 'isStartup', 'name',
                    'industry', 'avatar', 'avatarFileType', 'userID_id'
                )
            )

            if not profiles.exists():
                return Response(
                    {'error': 'No profiles found for this user'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            profile_data = []
            for profile in profiles:
                serializer = ProfilePreviewCardSerializer(profile)
                profile_data.append(serializer.data)

            return Response(profile_data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetCurrentUserProfileView(APIView):
    authentication_classes = [JWTAuthenticationMiddleware]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get(self, request):
        try:
            # Get and validate profile_id from query parameters
            profile_id = request.query_params.get('profileId')
            if not profile_id:
                return Response(
                    {'error': 'profileId query parameter is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                profile_id = int(profile_id)
                if profile_id < 0:
                    raise ValueError("Profile ID must be positive")
            except ValueError as e:
                return Response(
                    {'error': 'Invalid profileId format. Must be a positive integer.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get authenticated user
            try:
                user_account = UserAccount.objects.get(clerkUserID=request.user.username)
                user_id = user_account.userID
            except UserAccount.DoesNotExist:
                return Response(
                    {'error': 'User account not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            try:
                profile = (
                    Profile.objects.prefetch_related(
                        'experiences',
                        'certificates',
                        'achievements',
                        'jobPositions',
                        'profileprivacysettings',
                        'tags'
                    ).get(
                        profileID=profile_id,  # Verify specific profile
                        userID=user_id        # Verify ownership
                    )
                )
            except Profile.DoesNotExist:
                return Response(
                    {'error': 'Profile not found or access denied'},
                    status=status.HTTP_403_FORBIDDEN
                )

            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetUserProfileByIdView(APIView):
    authentication_classes = [JWTAuthenticationMiddleware]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def check_connection_status(self, profile_owner_id, request_user_id):
        """Check if the requesting user is connected to the profile owner"""
        try:
            # Query to check if users are connected (accepted connection status)
            connection = Connection.objects.filter(
                (Q(fromProfileID=profile_owner_id) & Q(toProfileID=request_user_id)) |
                (Q(fromProfileID=request_user_id) & Q(toProfileID=profile_owner_id)),
                status='accepted'
            ).exists()
            return connection
        except Exception as e:
            logger.error(f"Error checking connection status: {str(e)}", exc_info=True)
            return False

    def check_field_visibility(self, profile, field_name, privacy_settings, request_user_id):
        """Check if a field should be visible based on privacy settings and user relationship"""
        # If it's the profile owner, they can see everything
        if profile.userID.userID == request_user_id:
            return True

        if not hasattr(privacy_settings, f"{field_name.lower()}privacy"):
            return True

        privacy_value = getattr(privacy_settings, f"{field_name.lower()}privacy")
        
        if privacy_value == 'public':
            return True
        elif privacy_value == 'private':
            return False
        elif privacy_value == 'connections':
            return self.check_connection_status(profile.userID.userID, request_user_id)
        return False

    def filter_profile_data(self, profile_data, profile, privacy_settings, request_user_id):
        """Filter profile data based on privacy settings"""
        filtered_data = profile_data.copy()
        if 'privacySettings' in filtered_data:
            filtered_data.pop('privacySettings')
        
        if profile.userID.userID != request_user_id:
            privacy_fields = [
                'gender', 'industry', 'email', 'phoneNumber', 'country', 'city',
                'linkedInURL', 'slogan', 'websiteLink', 'hobbyInterest',
                'education', 'dateOfBirth', 'description', 'currentStage',
                'statement', 'aboutUs', 'avatar'
            ]

            for field in privacy_fields:
                if field in filtered_data and not self.check_field_visibility(profile, field, privacy_settings, request_user_id):
                    filtered_data.pop(field)
            nested_objects = {
                'experiences': 'experience',
                'certificates': 'certificate',
                'achievements': 'achievement',
                'jobPositions': 'jobPosition'
            }

            for field, privacy_field in nested_objects.items():
                if field in filtered_data and not self.check_field_visibility(profile, privacy_field, privacy_settings, request_user_id):
                    filtered_data.pop(field)

        return filtered_data

    def get(self, request, profile_id):
        try:
            try:
                user_account = UserAccount.objects.get(clerkUserID=request.user.username)
                user_id = user_account.userID
            except UserAccount.DoesNotExist:
                return Response(
                    {'error': 'User account not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            try:
                profile = (
                    Profile.objects.prefetch_related(
                        'experiences',
                        'certificates',
                        'achievements',
                        'jobPositions',
                        'profileprivacysettings',
                        'tags'
                    ).get(profileID=profile_id)
                )
            except Profile.DoesNotExist:
                return Response(
                    {'error': 'Profile not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            try:
                privacy_settings = profile.profileprivacysettings
            except ProfilePrivacySettings.DoesNotExist:
                privacy_settings = ProfilePrivacySettings.objects.create(
                    profileID=profile,
                    **ProfileSerializer().get_default_privacy_settings()
                )

            serializer = ProfileSerializer(profile)
            profile_data = serializer.data
            filtered_data = self.filter_profile_data(profile_data, profile, privacy_settings, user_id)
            return Response(filtered_data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UpdateProfileView(APIView):
    authentication_classes = [JWTAuthenticationMiddleware]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def validate_avatar_file(self, file):
        if not file:
            return None

        # Check file size
        if file.size > 2097152:
            raise ValidationError("Avatar file size must be less than 2MB")

        # Read file data and encode to base64
        file_data = file.read()
        return base64.b64encode(file_data)

    @transaction.atomic
    def patch(self, request):
        try:
            try:
                user_account = UserAccount.objects.get(clerkUserID=request.user.username)
                user_id = user_account.userID
            except UserAccount.DoesNotExist:
                return Response(
                    {'error': 'User account not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            profile_info = request.data.get('ProfileInfo')
            if isinstance(profile_info, str):
                try:
                    profile_data = json.loads(profile_info)
                except json.JSONDecodeError as e:
                    return Response(
                        {'error': f'Invalid JSON data: {str(e)}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                profile_data = profile_info

            if not profile_data:
                return Response(
                    {'error': 'ProfileInfo is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get the current active profile for the user
            try:
                profile = Profile.objects.filter(userID=user_id).latest('profileID')
            except Profile.DoesNotExist:
                return Response(
                    {'error': 'No profile found for this user'},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Set userID in profile data
            profile_data['userID'] = user_id
            profile_data['ProfileID'] = profile.profileID

            # Handle avatar file
            avatar_file = request.FILES.get('avatar')
            if avatar_file:
                try:
                    avatar_data = self.validate_avatar_file(avatar_file)
                    if avatar_data:
                        profile_data['avatar'] = avatar_data
                        _, ext = os.path.splitext(avatar_file.name)
                        if ext:
                            profile_data['avatarFileType'] = ext[1:].lower()
                except ValidationError as e:
                    return Response(
                        {'error': str(e)},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Update profile data
            serializer = ProfileSerializer(profile, data=profile_data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {'message': 'Profile updated successfully'},
                    status=status.HTTP_200_OK
                )
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
