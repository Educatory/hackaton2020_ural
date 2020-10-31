from django.contrib import messages
from django.urls import reverse
from django.views.generic import ListView, DetailView, CreateView, UpdateView

from base.forms import MunicipalityAdminForm, CriteriaAdminForm
from base.models import Municipality, Criteria
from core.views import ContextProcessor


class MunicipalityList(ListView, ContextProcessor):
    template_name = 'base/municipality_list.html'
    section = 'municipality'
    page_title = '<i class="icon-map5 mr-2"></i> Районы/Города'
    model = Municipality
    context_object_name = 'items'


class MunicipalityDetail(DetailView, ContextProcessor):
    template_name = 'base/municipality_detail.html'
    section = 'municipality'
    page_title = '<i class="icon-map5 mr-2"></i> Районы/Города'
    model = Municipality


class CriteriaList(ListView, ContextProcessor):
    template_name = 'base/criteria_list.html'
    section = 'criteria'
    page_title = '<i class="icon-puzzle4 mr-2"></i> Критерии'
    model = Criteria


class MunicipalityAdd(CreateView):
    """New Municipality"""

    model = Municipality
    template_name = 'base/municipality_add.html'
    form_class = MunicipalityAdminForm
    page_title = u'Добавить'

    def get_form_kwargs(self):
        kwargs = super(MunicipalityAdd, self).get_form_kwargs()
        kwargs.update({
            'form_title': self.page_title
        })
        return kwargs

    def get_success_url(self):
        messages.add_message(self.request, 25, u'Район успешно создан.')
        return u'%s' % reverse('municipality:list')


class CriteriaAdd(CreateView):
    """New Criteria"""

    model = Criteria
    template_name = 'base/citeria_add.html'
    form_class = CriteriaAdminForm
    page_title = u'Добавить'

    def get_form_kwargs(self):
        kwargs = super(CriteriaAdd, self).get_form_kwargs()
        kwargs.update({
            'form_title': self.page_title
        })
        return kwargs

    def get_success_url(self):
        messages.add_message(self.request, 25, u'Критерии успешно создан.')
        return u'%s' % reverse('municipality:criteria_list')


class CriteriaEdit(UpdateView):
    """Edit Criteria"""

    model = Criteria
    template_name = 'base/citeria_add.html'
    form_class = CriteriaAdminForm
    page_title = u'Изменить'

    def get_form_kwargs(self):
        kwargs = super(CriteriaEdit, self).get_form_kwargs()
        kwargs.update({
            'form_title': self.page_title
        })
        return kwargs

    def get_success_url(self):
        messages.add_message(self.request, 25, u'Индекс успешно отредактирован.')
        return u'%s' % reverse('municipality:criteria_list')