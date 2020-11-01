from django.contrib import admin

from base.models import BasicIndicators, Criteria, Municipality, MunicipalityCriteria


@admin.register(BasicIndicators)
class AdminBasicIndicators(admin.ModelAdmin):
    pass


@admin.register(Criteria)
class AdminCriteria(admin.ModelAdmin):
    filter_horizontal = ('indicators',)


@admin.register(Municipality)
class AdminMunicipality(admin.ModelAdmin):
    filter_horizontal = ('criteria',)
#
# @admin.register(MunicipalityCriteria)
# class AdminMMunicipalityCriteria(admin.ModelAdmin):
#     filter_horizontal = ('criteria.criteria',)

admin.site.register(MunicipalityCriteria)