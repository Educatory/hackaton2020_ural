from django.contrib import admin

from base.models import BasicIndicators, Criteria, Municipality


@admin.register(BasicIndicators)
class AdminBasicIndicators(admin.ModelAdmin):
    pass


@admin.register(Criteria)
class AdminCriteria(admin.ModelAdmin):
    pass


@admin.register(Municipality)
class AdminMunicipality(admin.ModelAdmin):
    pass
