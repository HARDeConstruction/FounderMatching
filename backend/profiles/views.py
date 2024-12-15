from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from .serializers import ProfileSerializer
from .models import Profile, UserAccount
from django.core.exceptions import ValidationError
from accounts.middlewares import JWTAuthenticationMiddleware
import logging

logger = logging.getLogger(__name__)

class CreateProfileView(APIView):
    authentication_classes = [JWTAuthenticationMiddleware]

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
            profile_data = request.data.get('ProfileInfo', {})
            profile_data['userID'] = user_id
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
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
