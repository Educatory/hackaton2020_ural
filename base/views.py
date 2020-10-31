from django.shortcuts import render
from django.views.generic import ListView, DetailView

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
    template_name = 'base/criteria_detail.html'
    section = 'criteria'
    page_title = '<i class="icon-puzzle4 mr-2"></i> Критерии'
    model = Criteria