# Generated by Django 4.1.7 on 2023-03-16 18:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('heavens', '0004_comet_constellation_meteorshower_star_planet'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='constellation',
            name='date',
        ),
    ]