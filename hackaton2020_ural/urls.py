
from django.contrib import admin
from django.urls import path, include

from core.views import IndexPage

urlpatterns = [
    path('', IndexPage.as_view(), name="index"),
    path('admin/', admin.site.urls),
    path('', include(('dashboard.urls', 'dashboard'), namespace='dashboard')),
]
