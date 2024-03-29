# Generated by Django 4.1.7 on 2023-03-23 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0021_profile_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='default_zip',
            field=models.CharField(max_length=5, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='profiles/'),
        ),
    ]
