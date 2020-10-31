from django.urls import path, include
from base.views import MunicipalityList, MunicipalityDetail, CriteriaList, MunicipalityAdd, CriteriaAdd, CriteriaEdit

urlpatterns = [
    path('municipality/', include([
        path('list/', MunicipalityList.as_view(), name='list'),
        path('<int:pk>/', MunicipalityDetail.as_view(), name='detail'),
        path('criteria/', CriteriaList.as_view(), name='criteria_list'),
        path('criteria/add/', CriteriaAdd.as_view(), name='criteria_add'),
        path('criteria/<int:pk>/', CriteriaEdit.as_view(), name='criteria_edit'),
        path('add/', MunicipalityAdd.as_view(), name='add'),
    ])),
]