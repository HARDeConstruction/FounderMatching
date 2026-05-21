from datetime import datetime

import environ
import jwt
import pytz
import requests
from django.contrib.auth.models import User
from django.core.cache import cache
from jwt.algorithms import RSAAlgorithm
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .services import UserAccountService

env = environ.Env()

CLERK_API_URL = "https://api.clerk.com/v1"
CLERK_FRONTEND_API_URL = env("CLERK_FRONTEND_API_URL")
CLERK_SECRET_KEY = env("CLERK_SECRET_KEY")

JWKS_CACHE_KEY = "clerk_jwks_data"
JWKS_CACHE_TTL = 3600       # 1 hour — re-fetch JWKS if Clerk rotates keys
USER_INFO_CACHE_TTL = 300   # 5 minutes per user


class JWTAuthenticationMiddleware(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None
        try:
            token = auth_header.split(" ")[1]
        except IndexError:
            raise AuthenticationFailed("Bearer token not provided.")

        user = self.decode_jwt(token)
        if not user:
            return None

        # B20: cache per-user Clerk info to avoid an HTTP call on every request
        info_cache_key = f"clerk_user_info_{user.username}"
        cached = cache.get(info_cache_key)

        if cached is None:
            clerk = ClerkSDK()
            info, found = clerk.fetch_user_info(user.username)
            if found:
                cache.set(info_cache_key, info, USER_INFO_CACHE_TTL)
            else:
                info = None
                found = False
        else:
            info = cached
            found = True

        if found and info:
            user.email = info["email_address"]
            user.first_name = info["first_name"]
            user.last_name = info["last_name"]
            user.last_login = info["last_login"]
            user.save()

            user_account, error = UserAccountService.create_or_update_user_account(
                clerk_user_id=user.username,
                email=info["email_address"],
                first_name=info["first_name"],
                last_name=info["last_name"],
            )
            if error:
                print(f"Error creating UserAccount: {error}")

        return user, None

    def decode_jwt(self, token):
        clerk = ClerkSDK()
        # B19: find matching key by 'kid' header so key rotation is handled
        try:
            unverified_header = jwt.get_unverified_header(token)
            kid = unverified_header.get("kid")
        except jwt.DecodeError:
            raise AuthenticationFailed("Token decode error.")

        jwks_data = clerk.get_jwks()
        public_key = None
        for key in jwks_data.get("keys", []):
            if kid and key.get("kid") == kid:
                public_key = RSAAlgorithm.from_jwk(key)
                break

        if public_key is None:
            # Fallback: use first key (single-key Clerk setup)
            if jwks_data.get("keys"):
                public_key = RSAAlgorithm.from_jwk(jwks_data["keys"][0])
            else:
                raise AuthenticationFailed("No JWKS keys found.")

        try:
            payload = jwt.decode(
                token,
                public_key,
                algorithms=["RS256"],
                options={"verify_signature": True},
            )
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired.")
        except jwt.DecodeError:
            raise AuthenticationFailed("Token decode error.")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token.")

        user_id = payload.get("sub")
        if user_id:
            user, created = User.objects.get_or_create(username=user_id)
            return user
        return None


class ClerkSDK:
    def fetch_user_info(self, user_id: str):
        response = requests.get(
            f"{CLERK_API_URL}/users/{user_id}",
            headers={"Authorization": f"Bearer {CLERK_SECRET_KEY}"},
        )
        if response.status_code == 200:
            data = response.json()
            return {
                "email_address": data["email_addresses"][0]["email_address"],
                "first_name": data["first_name"],
                "last_name": data["last_name"],
                "last_login": datetime.fromtimestamp(
                    data["last_sign_in_at"] / 1000, tz=pytz.UTC
                ),
            }, True
        else:
            return {
                "email_address": "",
                "first_name": "",
                "last_name": "",
                "last_login": None,
            }, False

    def get_jwks(self):
        # B19: cache with TTL so a key rotation is picked up after expiry
        jwks_data = cache.get(JWKS_CACHE_KEY)
        if not jwks_data:
            response = requests.get(f"{CLERK_FRONTEND_API_URL}/.well-known/jwks.json")
            if response.status_code == 200:
                jwks_data = response.json()
                cache.set(JWKS_CACHE_KEY, jwks_data, JWKS_CACHE_TTL)
            else:
                raise AuthenticationFailed("Failed to fetch JWKS.")
        return jwks_data
