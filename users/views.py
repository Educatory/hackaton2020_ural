from django.views.generic import ListView

from core.views import ContextProcessor
from users.models import CustomUser


class CustomUsersList(ListView, ContextProcessor):
    template_name = 'users/users_list.html'
    section = 'custom_users'
    page_title = '<i class="icon-users mr-2"></i> Пользователи'
    model = CustomUser
