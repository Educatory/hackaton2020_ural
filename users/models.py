
from django.db import models
from base.models import Municipality


class CustomUser(models.Model):
    ROLE = (
        [1, 'Администратор'],
        [2, 'Сотрудник'],
        [3, 'Руководитьель']
    )
    first_name = models.CharField('Имя', max_length=255, null=True)
    last_name = models.CharField('Фамилия', max_length=255, null=True)
    position = models.CharField('Должность', max_length=255, null=True)
    municipality = models.ForeignKey(Municipality,
                                     verbose_name='Муниципалитет', on_delete=models.CASCADE,
                                     null=True)
    role = models.PositiveSmallIntegerField("Роль пользователя", choices=ROLE, default=1)

    def __str__(self):
        return self.get_role_display()
