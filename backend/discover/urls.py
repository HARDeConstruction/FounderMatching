from django.urls import path
from .views import (
    GetConnectionsView,
)

urlpatterns = [
    path('getConnections/', GetConnectionsView.as_view(), name='get_connections'),
] 