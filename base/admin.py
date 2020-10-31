from django.contrib import admin

from base.models import BasicIndicators, Criteria, Municipality


@admin.register(BasicIndicators)
class AdminBasicIndicators(admin.ModelAdmin):
    pass


@admin.register(Criteria)
class AdminCriteria(admin.ModelAdmin):
    filter_horizontal = ('indicators',)


@admin.register(Municipality)
class AdminMunicipality(admin.ModelAdmin):
    filter_horizontal = ('criteria',)
