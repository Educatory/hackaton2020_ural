from django.urls import path, include
from base.views import MunicipalityList


urlpatterns = [
    path('municipality/', include([
        path('list/', MunicipalityList.as_view(), name='list')
    ])),
]