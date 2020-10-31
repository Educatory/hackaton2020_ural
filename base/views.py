from django.shortcuts import render
from django.views.generic import ListView, DetailView

from base.models import Municipality
from core.views import ContextProcessor


class MunicipalityList(ListView, ContextProcessor):
    template_name = 'base/municipality_list.html'
    section = 'municipality'
    page_title = '<i class="icon-map5 mr-2"></i> Районы/Города'
    model = Municipality


class MunicipalityDetail(DetailView):
    template_name = 'base/municipality_detail.html'
    section = 'municipality'
    page_title = '<i class="icon-map5 mr-2"></i> Районы/Города'
    model = Municipality