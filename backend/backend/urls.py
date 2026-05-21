"""
URL configuration for backend project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/profile/', include('profiles.urls')),
    path('api/discover/', include('discover.urls')),
    path('api/revisit/', include('revisit.urls')),
    path('api/', include('dashboard.urls')),
]
