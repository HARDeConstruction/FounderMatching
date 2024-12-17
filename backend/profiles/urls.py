from django.urls import path
from .views import CreateProfileView, GetUserProfilesView

urlpatterns = [
    path('create/', CreateProfileView.as_view(), name='create_profile'),
    path('getUserProfiles/', GetUserProfilesView.as_view(), name='get_user_profiles'),
] 