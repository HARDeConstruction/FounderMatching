from django.urls import path
from .views import (
    GetConnectionsView,
    DiscoverView,
)

urlpatterns = [
    path('getConnections/', GetConnectionsView.as_view(), name='get_connections'),
    path('', DiscoverView.as_view(), name='discover'),
] 