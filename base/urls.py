from django.urls import path, include
from base.views import MunicipalityList, MunicipalityDetail, MunicipalityAdd

urlpatterns = [
    path('municipality/', include([
        path('list/', MunicipalityList.as_view(), name='list'),
        path('<int:pk>/', MunicipalityDetail.as_view(), name='detail'),
        path('add/', MunicipalityAdd.as_view(), name='add'),
    ])),
]