from django.urls import path
from dashboard.views import DashboardView, DashboardChangeRole


urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('change-role/', DashboardChangeRole.as_view(), name='change_role'),
]