from django.contrib import messages
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import ListView, DetailView, CreateView

from base.forms import MunicipalityAdminForm
from base.models import Municipality
from core.views import ContextProcessor


class MunicipalityList(ListView, ContextProcessor):
    template_name = 'base/municipality_list.html'
    section = 'municipality'
    page_title = '<i class="icon-map5 mr-2"></i> Районы/Города'
    model = Municipality
    context_object_name = 'items'


class MunicipalityDetail(DetailView):
    template_name = 'base/municipality_detail.html'
    section = 'municipality'
    page_title = '<i class="icon-map5 mr-2"></i> Районы/Города'
    model = Municipality


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
