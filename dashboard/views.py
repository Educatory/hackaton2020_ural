
from django.views.generic import TemplateView
from django.views.generic.edit import ProcessFormView, BaseCreateView, FormView, FormMixin

from core.views import ContextProcessor


class DashboardView(TemplateView, ContextProcessor):

    template_name = 'dashboard/dashboard.html'
    section = 'dashboard'
    page_title = '<i class="icon-map5 mr-2"></i> Информационная доска'

    @property
    def crumbs(self):
        return []


class ReportsView(TemplateView, ContextProcessor):
    template_name = 'dashboard/reports_index.html'
    section = 'reports'
    page_title = '<i class="icon-stats-bars4 mr-2"></i> Отчеты'