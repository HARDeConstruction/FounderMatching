from django.db import IntegrityError
from django.core.exceptions import ValidationError
from .models import UserAccount

class UserAccountService:
    @staticmethod
    def create_or_update_user_account(clerk_user_id: str, email: str, first_name: str, last_name: str):
        try:
            user_account, created = UserAccount.objects.get_or_create(
                clerkuserid=clerk_user_id,
                defaults={
                    'email': email,
                    'firstname': first_name,
                    'lastname': last_name
                }
            )
            return user_account, None
            
        except ValidationError as e:
            return None, f"Invalid data format: {str(e)}"
        except IntegrityError as e:
            return None, f"Database integrity error: {str(e)}"
        except Exception as e:
            return None, f"Unexpected error: {str(e)}" 