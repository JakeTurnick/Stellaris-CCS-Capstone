# Generated by Django 4.1.7 on 2023-03-17 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('heavens', '0006_rename_abs_mag_star_absolute_magnitude_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meteorshower',
            name='date',
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name='meteorshower',
            name='dec',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='meteorshower',
            name='ra',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
