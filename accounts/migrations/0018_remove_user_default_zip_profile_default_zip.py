# Generated by Django 4.1.7 on 2023-03-19 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0017_user_tracked_comets_user_tracked_meteor_showers_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='default_zip',
        ),
        migrations.AddField(
            model_name='profile',
            name='default_zip',
            field=models.CharField(max_length=5, null=True),
        ),
    ]