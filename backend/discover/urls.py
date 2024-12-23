from django.urls import path
from .views import (
    GetConnectionsView,
    DiscoverView,
    ConnectView
)

urlpatterns = [
    path('getConnections/', GetConnectionsView.as_view(), name='get_connections'),
    path('connect/', ConnectView.as_view(), name='connect'),
    path("discover/", DiscoverView.as_view(), name='discover')
] 