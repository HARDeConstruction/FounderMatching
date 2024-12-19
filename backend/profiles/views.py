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

        # Read and encode file data
        file_data = file.read()
        return base64.b64encode(file_data).decode('utf-8')

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
                        profile_data['avatar_file'] = avatar_data
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

    def prepare_avatar_files(self, profiles):
        """Prepare avatar files and return a list of (filename, content) tuples"""
        avatar_files = []
        temp_dir = tempfile.mkdtemp()
        
        try:
            for i, profile in enumerate(profiles, 1):
                if profile.avatar and profile.avatarFileType:
                    if isinstance(profile.avatar, memoryview):
                        avatar_data = profile.avatar.tobytes()
                    else:
                        avatar_data = profile.avatar

                    temp_path = os.path.join(temp_dir, f"{i}.{profile.avatarFileType}")
                    with open(temp_path, 'wb') as f:
                        f.write(avatar_data)

                    with open(temp_path, 'rb') as f:
                        file_content = f.read()
                        mime_type = mimetypes.guess_type(temp_path)[0]
                        avatar_files.append((f"avatar_{i}", file_content, mime_type))

        finally:
            import shutil
            shutil.rmtree(temp_dir, ignore_errors=True)

        return avatar_files

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
            
            avatar_files = self.prepare_avatar_files(profiles)
            profile_data = []
            for i, profile in enumerate(profiles, 1):
                serializer = ProfilePreviewCardSerializer(
                    profile,
                    context={'avatar_number': i if profile.avatar else None}
                )
                profile_data.append(serializer.data)

            response = HttpResponse(content_type='multipart/form-data; boundary=boundary')
            
            json_data = json.dumps({'profiles': profile_data})
            response.write(b'--boundary\r\n')
            response.write(b'Content-Disposition: form-data; name="ProfileInfo"\r\n')
            response.write(b'Content-Type: application/json\r\n\r\n')
            response.write(json_data.encode())
            response.write(b'\r\n')

            for filename, content, mime_type in avatar_files:
                response.write(b'--boundary\r\n')
                response.write(f'Content-Disposition: form-data; name="{filename}"; filename="{filename}"\r\n'.encode())
                response.write(f'Content-Type: {mime_type}\r\n\r\n'.encode())
                response.write(content)
                response.write(b'\r\n')

            response.write(b'--boundary--\r\n')
            return response

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetCurrentUserProfileView(APIView):
    authentication_classes = [JWTAuthenticationMiddleware]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def prepare_avatar_file(self, profile):
        """Prepare avatar file and return a tuple of (filename, content, mime_type)"""
        if not profile.avatar or not profile.avatarFileType:
            return None

        temp_dir = tempfile.mkdtemp()
        try:
            if isinstance(profile.avatar, memoryview):
                avatar_data = profile.avatar.tobytes()
            else:
                avatar_data = profile.avatar
            temp_path = os.path.join(temp_dir, f"avatar.{profile.avatarFileType}")
            with open(temp_path, 'wb') as f:
                f.write(avatar_data)
            with open(temp_path, 'rb') as f:
                file_content = f.read()
                mime_type = mimetypes.guess_type(temp_path)[0]
                return ("avatar", file_content, mime_type)

        except Exception as e:
            logger.error(f"Error preparing avatar file: {str(e)}", exc_info=True)
            return None
        finally:
            import shutil
            shutil.rmtree(temp_dir, ignore_errors=True)

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
            profile_data = serializer.data
            response = HttpResponse(content_type='multipart/form-data; boundary=boundary')
            
            json_data = json.dumps({'ProfileInfo': profile_data})
            response.write(b'--boundary\r\n')
            response.write(b'Content-Disposition: form-data; name="ProfileInfo"\r\n')
            response.write(b'Content-Type: application/json\r\n\r\n')
            response.write(json_data.encode())
            response.write(b'\r\n')
            avatar_file = self.prepare_avatar_file(profile)
            if avatar_file:
                filename, content, mime_type = avatar_file
                response.write(b'--boundary\r\n')
                response.write(f'Content-Disposition: form-data; name="{filename}"; filename="{filename}"\r\n'.encode())
                response.write(f'Content-Type: {mime_type}\r\n\r\n'.encode())
                response.write(content)
                response.write(b'\r\n')

            response.write(b'--boundary--\r\n')
            return response

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetUserProfileByIdView(APIView):
    authentication_classes = [JWTAuthenticationMiddleware]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def prepare_avatar_file(self, profile):
        """Prepare avatar file and return a tuple of (filename, content, mime_type)"""
        if not profile.avatar or not profile.avatarFileType:
            return None

        temp_dir = tempfile.mkdtemp()
        try:
            if isinstance(profile.avatar, memoryview):
                avatar_data = profile.avatar.tobytes()
            else:
                avatar_data = profile.avatar

            temp_path = os.path.join(temp_dir, f"avatar.{profile.avatarFileType}")
            with open(temp_path, 'wb') as f:
                f.write(avatar_data)
            with open(temp_path, 'rb') as f:
                file_content = f.read()
                mime_type = mimetypes.guess_type(temp_path)[0]
                return ("avatar", file_content, mime_type)

        except Exception as e:
            logger.error(f"Error preparing avatar file: {str(e)}", exc_info=True)
            return None
        finally:
            import shutil
            shutil.rmtree(temp_dir, ignore_errors=True)

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
                'statement', 'aboutUs'
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

            response = HttpResponse(content_type='multipart/form-data; boundary=boundary')
            
            json_data = json.dumps({'ProfileInfo': filtered_data})
            response.write(b'--boundary\r\n')
            response.write(b'Content-Disposition: form-data; name="ProfileInfo"\r\n')
            response.write(b'Content-Type: application/json\r\n\r\n')
            response.write(json_data.encode())
            response.write(b'\r\n')

            if self.check_field_visibility(profile, 'avatar', privacy_settings, user_id):
                avatar_file = self.prepare_avatar_file(profile)
                if avatar_file:
                    filename, content, mime_type = avatar_file
                    response.write(b'--boundary\r\n')
                    response.write(f'Content-Disposition: form-data; name="{filename}"; filename="{filename}"\r\n'.encode())
                    response.write(f'Content-Type: {mime_type}\r\n\r\n'.encode())
                    response.write(content)
                    response.write(b'\r\n')

            response.write(b'--boundary--\r\n')
            return response

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
