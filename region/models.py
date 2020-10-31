from django.db import models
from django.utils.safestring import mark_safe


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
    # gerb_img = models.ImageField()
    region = models.ForeignKey(Region, verbose_name=u"Район", on_delete=models.CASCADE)
    icon = models.ImageField("Logo", blank=True, null=True)

    class Meta:
        verbose_name = 'Город'
        verbose_name_plural = 'Города'

    def __str__(self):
        return self.name

    def icon_thumb(self):
        if self.icon:
            return mark_safe('<img width="100" src={}/>'.format(self.icon.url))
        else:
            return '-'

