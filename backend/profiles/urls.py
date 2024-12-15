from django.urls import path
from .views import CreateProfileView

urlpatterns = [
    path('create/', CreateProfileView.as_view(), name='create_profile'),
] 