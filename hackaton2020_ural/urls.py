from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve

from core.views import IndexPage
from hackaton2020_ural import settings

urlpatterns = [
    path('', IndexPage.as_view(), name="index"),
    path('admin/', admin.site.urls),
    path('', include(('dashboard.urls', 'dashboard'), namespace='dashboard')),
    path('', include(('base.urls', 'base'), namespace='municipality')),
]
urlpatterns += [
    re_path('media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT, }),
]
