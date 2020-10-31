from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.generic.base import ContextMixin


class ContextProcessor(ContextMixin):

    def get_context_data(self, **kwargs):
        context = super(ContextProcessor, self).get_context_data(**kwargs)
        context['page_title'] = getattr(self, 'page_title', None)
        context['section'] = getattr(self, 'section', None)
        return context


class IndexPage(TemplateView):

    template_name = 'index.html'