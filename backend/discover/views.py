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
                if profile.profileID == profile_id:
                    current_profile = profile
                    break
            else:
                return Response(
                    {'error': 'Profile not found or access denied'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Get the list of connected profiles in the Matching table satisfying:
            # fromProfileID = current_profile.profileID
            # status = "accepted"
            connected_profile_id = Matching.objects.filter(
                fromProfileID=current_profile.profileID,
                status="accepted"
            )

            # Get the page number (page) and page size (perPage) from the request
            page = int(request.query_params.get('page', 1))
            per_page = int(request.query_params.get('perPage', 5))

            # Calculate the index range according to the page and per_page
            start_index = (page - 1) * per_page
            end_index = start_index + per_page

            # Get the profiles that are connected to the current profile
            profiles = Profile.objects.filter(profileID__in=connected_profile_id).order_by('createdDateTime')[start_index:end_index]

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
