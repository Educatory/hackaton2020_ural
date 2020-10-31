from django.db import models


class VisibleManager(models.Manager):
    def get_query_set(self):
        kwargs = {"visible": True}
        return super(VisibleManager, self).get_query_set().filter(**kwargs)


class Location(models.Model):
    class Meta:
        abstract = True
        ordering = ('name',)

    name = models.CharField(u'Регион', max_length=255)
    visible = models.BooleanField(u'Показывать?', default=True)

    allobjects = models.Manager()
    objects = VisibleManager()

    def __str__(self):
        return self.name


class Region(Location):
    """Регионы и области"""

    class Meta:
        verbose_name = 'Регион'
        verbose_name_plural = 'Регионы'


class City(Location):
    """Города"""
    region = models.ForeignKey(Region, verbose_name=u"Район", on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Город'
        verbose_name_plural = 'Города'
