from django.contrib import admin
from .models import Entity
from .models import Star, Constellation, Comet, MeteorShower, Planet

# Register your models here.
admin.site.register(Entity)
admin.site.register(Star)
admin.site.register(Constellation)
admin.site.register(Comet)
admin.site.register(MeteorShower)
admin.site.register(Planet)
