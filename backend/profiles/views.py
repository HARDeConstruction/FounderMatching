from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.db import transaction
from django.core.files.base import ContentFile
from django.http import HttpResponse
from .serializers import ProfileSerializer, ProfilePreviewCardSerializer
from .models import Profile, UserAccount
from django.core.exceptions import ValidationError
from accounts.middlewares import JWTAuthenticationMiddleware
import json
import base64
import logging
import os
import tempfile
import mimetypes

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
                    # Convert bytes to file
                    if isinstance(profile.avatar, memoryview):
                        avatar_data = profile.avatar.tobytes()
                    else:
                        avatar_data = profile.avatar

                    # Create temporary file
                    temp_path = os.path.join(temp_dir, f"{i}.{profile.avatarFileType}")
                    with open(temp_path, 'wb') as f:
                        f.write(avatar_data)

                    # Read file and get mime type
                    with open(temp_path, 'rb') as f:
                        file_content = f.read()
                        mime_type = mimetypes.guess_type(temp_path)[0]
                        avatar_files.append((f"avatar_{i}", file_content, mime_type))

        finally:
            # Clean up temporary directory
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

            # Prepare avatar files
            avatar_files = self.prepare_avatar_files(profiles)

            # Prepare profile data with numbered avatars
            profile_data = []
            for i, profile in enumerate(profiles, 1):
                serializer = ProfilePreviewCardSerializer(
                    profile,
                    context={'avatar_number': i if profile.avatar else None}
                )
                profile_data.append(serializer.data)

            # Prepare multipart response
            response = HttpResponse(content_type='multipart/form-data; boundary=boundary')
            
            # Add JSON part
            json_data = json.dumps({'profiles': profile_data})
            response.write(b'--boundary\r\n')
            response.write(b'Content-Disposition: form-data; name="ProfileInfo"\r\n')
            response.write(b'Content-Type: application/json\r\n\r\n')
            response.write(json_data.encode())
            response.write(b'\r\n')

            # Add avatar files
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
