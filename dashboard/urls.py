from django.urls import path
from dashboard.views import DashboardView, ReportsView


urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('reports/', ReportsView.as_view(), name='reports'),
]