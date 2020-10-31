from django.contrib import admin

# Register your models here.
from region.models import City, Region


@admin.register(City)
class AdminCity(admin.ModelAdmin):
    list_display = ['icon_thumb', 'name']
    list_display_links = ['name']


@admin.register(Region)
class AdminCity(admin.ModelAdmin):
    pass
