
from django.views.generic import TemplateView
from django.views.generic.edit import ProcessFormView, BaseCreateView, FormView, FormMixin

from base.models import Municipality
from core.views import ContextProcessor


class DashboardView(TemplateView, ContextProcessor):

    template_name = 'dashboard/dashboard.html'
    section = 'dashboard'
    page_title = '<i class="icon-map5 mr-2"></i> Информационная доска'

    def get_context_data(self, **kwargs):
        context = super(DashboardView, self).get_context_data(**kwargs)
        context.update({
            'municipality': Municipality.objects.all(),
            'general_index': Municipality.get_general_index()
        })
        return context

    @property
    def crumbs(self):
        return []


class ReportsView(TemplateView, ContextProcessor):
    template_name = 'dashboard/reports_index.html'
    section = 'reports'
    page_title = '<i class="icon-stats-bars4 mr-2"></i> Отчеты'


class ActionsView(TemplateView, ContextProcessor):
    template_name = 'dashboard/actions_index.html'
    section = 'actions'
    page_title = '<i class="icon-pulse2 mr-2"></i> Активность'