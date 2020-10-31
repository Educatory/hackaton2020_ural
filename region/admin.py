from django.contrib import admin

# Register your models here.
from region.models import City, Region


@admin.register(City)
class AdminCity(admin.ModelAdmin):
    pass


@admin.register(Region)
class AdminCity(admin.ModelAdmin):
    pass
