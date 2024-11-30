from django.urls import path
from .views import test_api_view

urlpatterns = [
    path('test/', test_api_view, name='test_api'),
]