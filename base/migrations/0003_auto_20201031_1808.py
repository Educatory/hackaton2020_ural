# Generated by Django 3.1.2 on 2020-10-31 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_auto_20201031_1750'),
    ]

    operations = [
        migrations.AlterField(
            model_name='criteria',
            name='indicators',
            field=models.ManyToManyField(blank=True, null=True, to='base.BasicIndicators', verbose_name='Базоваые показетели'),
        ),
    ]
