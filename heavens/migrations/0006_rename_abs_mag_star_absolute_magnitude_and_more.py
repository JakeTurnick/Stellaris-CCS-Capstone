# Generated by Django 4.1.7 on 2023-03-17 15:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('heavens', '0005_remove_constellation_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='star',
            old_name='abs_mag',
            new_name='absolute_magnitude',
        ),
        migrations.RenameField(
            model_name='star',
            old_name='app_mag',
            new_name='apparent_magnitude',
        ),
        migrations.RenameField(
            model_name='star',
            old_name='dec',
            new_name='declination',
        ),
        migrations.RenameField(
            model_name='star',
            old_name='ly_dist',
            new_name='distance_light_year',
        ),
        migrations.RenameField(
            model_name='star',
            old_name='ra',
            new_name='right_ascension',
        ),
        migrations.RenameField(
            model_name='star',
            old_name='spec_class',
            new_name='spectral_class',
        ),
    ]
