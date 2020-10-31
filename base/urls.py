from django.urls import path, include
from base.views import MunicipalityList, MunicipalityDetail, CriteriaList


urlpatterns = [
    path('municipality/', include([
        path('list/', MunicipalityList.as_view(), name='list'),
        path('<int:pk>/', MunicipalityDetail.as_view(), name='detail'),

        path('criteria/', CriteriaList.as_view(), name='criteria_list'),

    ])),
]