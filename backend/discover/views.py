from multiprocessing.managers import BaseManager
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.db import transaction
from django.core.files.base import ContentFile
from django.http import HttpResponse
from .serializers import ProfileSerializer, ProfilePreviewCardSerializer, TagSerializer
from .models import Profile, UserAccount, ProfilePrivacySettings, Connection, Tags, ProfileTagInstances, Matching
from django.core.exceptions import ValidationError
from accounts.middlewares import JWTAuthenticationMiddleware
import json
import base64
import logging
import os
import tempfile
import mimetypes
from django.db.models import Q, Prefetch
from typing import Optional

logger = logging.getLogger(__name__)

# Create your views here.
class GetConnectionsView(APIView):
    authentication_classes = [JWTAuthenticationMiddleware]

    def get(self, request):

        print(request)

        try:
            try:
                user_account = UserAccount.objects.get(clerkUserID=request.user.username)
                user_id = user_account.userID
            except UserAccount.DoesNotExist:
                return Response(
                    {'error': 'User account not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            profile_id = request.query_params.get('profileId')
            if not profile_id:
                return Response(
                    {'error': 'profileId is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            try:
                profile_id = int(profile_id)
            except ValueError:
                return Response(
                    {'error': 'profileId must be an integer'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            

            # Get profiles owned by this user with prefetched tags
            profiles = Profile.objects.filter(userID=user_id).prefetch_related(
                Prefetch(
                    'tags',
                    queryset=ProfileTagInstances.objects.select_related('tagID')
                )
            )

            if not profiles.exists():
                return Response(
                    {'error': 'No profiles found for this user'},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Check if profile_id is in the list of profiles owned by this user
            current_profile : Profile = None
            for profile in profiles:
                print(profile.profileID, profile.name)
                if profile.profileID == profile_id:
                    current_profile = profile
                    break
            else:
                return Response(
                    {'error': 'Profile not found or access denied'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            if current_profile.isStartup:
                # Get the list of connected profiles in the Matching table satisfying:
                # startupprofileid = current_profile.profileID
                connected_profile_ids = Matching.objects.filter(
                    startupprofileid=current_profile.profileID,
                    ismatched=True
                )
                # Get the array of candidates profiles only:
                connected_profile_ids = [profile.candidateprofileid_id for profile in connected_profile_ids]
            else:
                # Get the list of connected profiles in the Matching table satisfying:
                # candidateprofileid = current_profile.profileID
                connected_profile_ids = Matching.objects.filter(
                    candidateprofileid=current_profile.profileID,
                    ismatched=True
                )
                # Get the array of startupprofiles only:
                connected_profile_ids = [profile.startupprofileid_id for profile in connected_profile_ids]

            # Debug: print all connected profiles id 
            print ("Connected profiles:")
            for profile in connected_profile_ids:
                print(profile)

            # Get the page number (page) and page size (perPage) from the request
            page = int(request.query_params.get('page', 1))
            per_page = int(request.query_params.get('perPage', 5))

            # Calculate the index range according to the page and per_page
            start_index = (page - 1) * per_page
            end_index = start_index + per_page

            print(start_index, end_index)

            # Get the profiles from the list of ids given by connected_profile_ids
            profiles = Profile.objects.filter(profileID__in=connected_profile_ids[start_index:end_index]).prefetch_related(
                Prefetch(
                    'tags',
                    queryset=ProfileTagInstances.objects.select_related('tagID')
                )
            )

            # Serialize the profiles            
            serialized_profiles_data = []
            for profile in profiles:
                serializer = ProfilePreviewCardSerializer(profile)
                serialized_profiles_data.append(serializer.data)

            return Response(serialized_profiles_data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
