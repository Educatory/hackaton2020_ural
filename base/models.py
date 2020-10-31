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
    indicators = models.ManyToManyField(BasicIndicators, verbose_name='Базоваые показетели')
    formula = models.CharField("Алгоритм расчета показетля", max_length=200)

    class Meta:
        ordering = ['name']
        verbose_name = 'Критерии'
        verbose_name_plural = "Критерии"

    def __str__(self):
        return self.name


class Municipality(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    criteria = models.ManyToManyField(Criteria)

    class Meta:
        ordering = ['city']
        verbose_name = 'Мниципальный район'
        verbose_name_plural = 'Муниципальные районы'

    def __str__(self):
        return self.city.name
