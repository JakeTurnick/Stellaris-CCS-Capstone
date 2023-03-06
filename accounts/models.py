from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.


class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    display_name = models.CharField(max_length=255)

    def __str__(self):
        return self.display_name


class Plan(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    date = models.DateField()
    title = models.CharField(max_length=255)
    notes = models.TextField(max_length=1000, blank=True)

    def __str__(self):
        return self.title[:100]

#   - Date of plan
#   - Selected Event (default=stargazing - aka no specific event, just stars)
#   - location (optional)
#   - notes / blurb
#   - (WANT) invitees (? friends system or..?)
