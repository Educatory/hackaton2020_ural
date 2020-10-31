
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

