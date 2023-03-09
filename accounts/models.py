from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.


class User(AbstractUser):
    default_zip = models.PositiveIntegerField(null=True,
                                              validators=[MinValueValidator(1), MaxValueValidator(99999)])


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    display_name = models.CharField(max_length=255)

    def __str__(self):
        return self.display_name


class Plan(models.Model):
    # EVENTS
    STAR_GAZING = "strgz"
    PLANET_VIEWING = "plntv"
    METEOR_SHOWER = "mtshr"
    COMET = "comet"
    HUMAN_CRAFT = "hcrft"

    # CHOICES
    EVENT_CHOICES = [
        (STAR_GAZING, 'Star gazing'),
        (METEOR_SHOWER, 'Meteor Shower'),
        (COMET, 'Comet sighting'),
        (PLANET_VIEWING, 'Planet viewing'),
        (HUMAN_CRAFT, 'Human Craft'),
    ]

    # creator = models.ForeignKey(Profile, on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    date = models.DateField(blank=True, null=True)
    title = models.CharField(max_length=255)
    event = models.CharField(
        max_length=5, choices=EVENT_CHOICES, default=EVENT_CHOICES[0][0])
    notes = models.TextField(max_length=1000, blank=True)
    # entity field to select from the Entities model

    def __str__(self):
        return self.title[:100]

#   - Date of plan
#   - Selected Event (default=stargazing - aka no specific event, just stars)
#   - location (optional)
#   - notes / blurb
#   - (WANT) invitees (? friends system or..?)
