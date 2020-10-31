
from django.views.generic import TemplateView


class DashboardView(TemplateView):

    template_name = 'dashboard/dashboard.html'
    section = 'dashboard'
    page_title = '<i class="icon-home4 mr-2"></i>Панель управления'

    @property
    def crumbs(self):
        return []
