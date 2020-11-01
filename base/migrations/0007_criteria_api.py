# Generated by Django 3.1.2 on 2020-10-31 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_auto_20201031_2143'),
    ]

    operations = [
        migrations.AddField(
            model_name='criteria',
            name='api',
            field=models.CharField(blank=True, help_text='Настройки подключения к АПИ из открытых источнико', max_length=250, null=True, verbose_name='API URI'),
        ),
    ]