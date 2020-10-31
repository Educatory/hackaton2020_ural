from django.urls import path, include
from users.views import CustomUsersList


urlpatterns = [
    path('custom_users/', include([
        path('list/', CustomUsersList.as_view(), name='list'),
    ])),
]