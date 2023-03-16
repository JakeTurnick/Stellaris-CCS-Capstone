from django.db import models

# Create your models here.


class Entity(models.Model):

    # ENTITY TYPE
    STAR = "star"
    CONSTELLATION = "const"
    METEOR_SHOWER = "mtshr"
    COMET = "comet"
    PLANET = "plnt"
    HUMAN_CRAFT = "hcrft"

    # CHOICES
    TYPE_CHOICES = [
        (STAR, 'Star'),
        (CONSTELLATION, 'Constellation'),
        (METEOR_SHOWER, 'Meteor Shower'),
        (COMET, 'Comet'),
        (PLANET, 'Planet'),
        (HUMAN_CRAFT, 'Human Craft'),
    ]
    e_type = models.CharField(max_length=5, choices=TYPE_CHOICES)
    name = models.CharField(max_length=255)
    # constellation = models.CharField
    date = models.DateField(blank=True, null=True)
    ra = models.CharField(max_length=50)
    dec = models.CharField(max_length=50)
    spec_class = models.CharField(max_length=50)
    abs_mag = models.CharField(max_length=50)
    app_mag = models.CharField(max_length=50)
    ly_dist = models.CharField(max_length=50)

    def __str__(self):
        return (self.e_type + " | " + self.name)


class Star(models.Model):
    name = models.CharField(max_length=255)
    constellation = models.ForeignKey(
        'Constellation', on_delete=models.CASCADE)
    # date = models.DateField(blank=True, null=True)
    ra = models.CharField(max_length=50)
    dec = models.CharField(max_length=50)
    spec_class = models.CharField(max_length=50)
    abs_mag = models.CharField(max_length=50)
    app_mag = models.CharField(max_length=50)
    ly_dist = models.CharField(max_length=50)

    def __str__(self):
        return (self.name)


class Constellation(models.Model):
    name = models.CharField(max_length=255)
    # date = models.DateField(blank=True, null=True)
    # img = models.CharField <- star map image src from API
    # These fields are only applicable if averaged on all the stars in constellation
    # avg_ra = models.CharField(max_length=50)
    # avg_dec = models.CharField(max_length=50)
    # spec_class = models.CharField(max_length=50)
    # abs_mag = models.CharField(max_length=50)
    # app_mag = models.CharField(max_length=50)
    # ly_dist = models.CharField(max_length=50)

    def __str__(self):
        return (self.name)


class Comet(models.Model):
    name = models.CharField(max_length=255)
    # constellation = models.ForeignKey('Constellation', on_delete=models.CASCADE)
    date = models.DateField(blank=True, null=True)
    ra = models.CharField(max_length=50)
    dec = models.CharField(max_length=50)
    spec_class = models.CharField(max_length=50)
    abs_mag = models.CharField(max_length=50)
    app_mag = models.CharField(max_length=50)
    ly_dist = models.CharField(max_length=50)

    def __str__(self):
        return (self.name)


class MeteorShower(models.Model):
    name = models.CharField(max_length=255)
    # constellation = models.ForeignKey('Constellation', on_delete=models.CASCADE)
    date = models.DateField(blank=True, null=True)
    ra = models.CharField(max_length=50)
    dec = models.CharField(max_length=50)
    # unsure if useable for Meteor Showers
    # spec_class = models.CharField(max_length=50)
    # abs_mag = models.CharField(max_length=50)
    # app_mag = models.CharField(max_length=50)
    # ly_dist = models.CharField(max_length=50)

    def __str__(self):
        return (self.name)


class Planet(models.Model):
    name = models.CharField(max_length=255)
    constellation = models.ForeignKey(
        'Constellation', on_delete=models.CASCADE)
    # date = models.DateField(blank=True, null=True)
    ra = models.CharField(max_length=50)
    dec = models.CharField(max_length=50)
    spec_class = models.CharField(max_length=50)
    abs_mag = models.CharField(max_length=50)
    app_mag = models.CharField(max_length=50)
    ly_dist = models.CharField(max_length=50)

    def __str__(self):
        return (self.name)


# Not quite sure how to implement this one yet
# class HumanCraft(models.Model):
#     name = models.CharField(max_length=255)
#     constellation = models.ForeignKey('Constellation', on_delete=models.CASCADE)
#     date = models.DateField(blank=True, null=True)
#     ra = models.CharField(max_length=50)
#     dec = models.CharField(max_length=50)
#     spec_class = models.CharField(max_length=50)
#     abs_mag = models.CharField(max_length=50)
#     app_mag = models.CharField(max_length=50)
#     ly_dist = models.CharField(max_length=50)

#     def __str__(self):
#         return (self.e_type + " | " + self.name)
