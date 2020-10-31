from django.contrib import admin

# Register your models here.
from users.models import CustomUser


@admin.register(CustomUser)
class AdminUser(admin.ModelAdmin):
    pass
