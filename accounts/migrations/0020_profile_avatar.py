# Generated by Django 4.1.7 on 2023-03-19 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0019_remove_profile_default_zip_user_default_zip'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(null=True, upload_to='profiles/'),
        ),
    ]
