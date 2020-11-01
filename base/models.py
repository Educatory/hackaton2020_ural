from django.db import models
from django.db.models import Avg
from django_extensions.db.models import TimeStampedModel
from region.models import City


class BasicIndicators(models.Model):
    name = models.CharField("Название показателя", max_length=255)
    value = models.CharField("Значение", max_length=50)

    class Meta:
        ordering = ['name']
        verbose_name = 'Базовый показетель'
        verbose_name_plural = 'Базоваые показетели'

    def __str__(self):
        return self.name


class Criteria(models.Model):
    name = models.CharField("Критерии", max_length=500)
    indicators = models.ManyToManyField(BasicIndicators,
                                        verbose_name='Базоваые показатели',
                                        blank=True)
    formula = models.CharField("Алгоритм расчета показетля", max_length=200, blank=True, null=True)
    description = models.TextField('Описание', null=True, blank=True)
    api = models.CharField("API URI", max_length=250, blank=True, null=True,
                           help_text="Настройки подключения к API из открытых источников")

    class Meta:
        ordering = ['name']
        verbose_name = 'Критерий/Индикатор'
        verbose_name_plural = "Критерии/Индикатор"

    def __str__(self):
        return self.name


class Municipality(models.Model):
    city = models.ForeignKey(City, verbose_name='Муниципальный район',  on_delete=models.CASCADE)
    criteria = models.ManyToManyField(Criteria, verbose_name='Критерии')
    order = models.IntegerField('Порядок', default=1)
    index = models.DecimalField("Index", decimal_places=2, max_digits=5, default=0)

    class Meta:
        ordering = ['order', 'city']
        verbose_name = 'Муниципальный район'
        verbose_name_plural = 'Муниципальные районы'

    def __str__(self):
        return self.city.name

    def get_index(self):
        """Вычисление среднего индекса относительно критереев"""
        return self.index

    @classmethod
    def get_general_index(cls):
        """Вычисление среднего общего индекса """
        avg_ind = cls.objects.all().aggregate(Avg('index'))
        return avg_ind['index__avg']


class MunicipalityCriteria(TimeStampedModel):

    municipality = models.ForeignKey(Municipality,
                                     verbose_name='Города/Районы',
                                     on_delete=models.CASCADE)
    criteria = models.ForeignKey(Criteria,
                                 verbose_name='Критерии',
                                 on_delete=models.CASCADE)

    dataset = models.JSONField()

    class Meta:
        ordering = ['created']
        verbose_name = 'Данные критерия'
        verbose_name_plural = 'Данные критерия'

    def __str__(self):
        return ''
