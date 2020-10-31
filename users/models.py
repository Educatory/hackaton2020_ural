
from django.db import models


# Create your models here.
class CustomUser(models.Model):
    ROLE = (
        [1, 'Администратор'],
        [2, 'Сотрудник'],
        [3, 'Руководитьель']
    )

    role = models.PositiveSmallIntegerField("Роль пользователя", choices=ROLE, default=1)

    def __str__(self):
        return self.get_role_display()
