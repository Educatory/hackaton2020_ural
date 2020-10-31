from django.db import models

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
                                        verbose_name='Базоваые показетели',
                                        blank=True)
    formula = models.CharField("Алгоритм расчета показетля", max_length=200, blank=True, null=True)
    description = models.TextField('Описание', null=True, blank=True)
    api = models.CharField("API URI", max_length=250, blank=True, null=True,
                           help_text="Настройки подключения к АПИ из открытых источнико")

    class Meta:
        ordering = ['name']
        verbose_name = 'Критерии/Индикатор (единица измерения)'
        verbose_name_plural = "Критерии/Индикатор (единица измерения)"

    def __str__(self):
        return self.name


class Municipality(models.Model):
    city = models.ForeignKey(City, verbose_name='Муниципальный район',  on_delete=models.CASCADE)
    criteria = models.ManyToManyField(Criteria, verbose_name='Критерии')
    order = models.IntegerField('Порядок', default=1)

    class Meta:
        ordering = ['order', 'city']
        verbose_name = 'Муниципальный район'
        verbose_name_plural = 'Муниципальные районы'

    def __str__(self):
        return self.city.name

    def get_index(self):
        """Вычисление среднего индекса относительно критереев"""
        return 5.7

    @classmethod
    def get_general_index(cls):
        """Вычисление среднего общего индекса """
        return 5.7