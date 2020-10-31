# Generated by Django 3.1.2 on 2020-10-31 10:46

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Регион')),
                ('visible', models.BooleanField(default=True, verbose_name='Показывать?')),
            ],
            options={
                'verbose_name': 'Регион',
                'verbose_name_plural': 'Регионы',
            },
            managers=[
                ('allobjects', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Регион')),
                ('visible', models.BooleanField(default=True, verbose_name='Показывать?')),
                ('region', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='region.region', verbose_name='Регион')),
            ],
            options={
                'verbose_name': 'Город',
                'verbose_name_plural': 'Города',
            },
            managers=[
                ('allobjects', django.db.models.manager.Manager()),
            ],
        ),
    ]
