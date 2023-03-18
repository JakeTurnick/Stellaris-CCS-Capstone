from rest_framework import serializers
from .models import Entity
from .models import Star, Constellation, Comet, MeteorShower, Planet


class EntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = '__all__'


class StarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Star
        fields = '__all__'
        depth = 1


class ConstellationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Constellation
        fields = '__all__'
        depth = 1


class CometSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comet
        fields = '__all__'


class MeteorShowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeteorShower
        fields = '__all__'


class PlanetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planet
        fields = '__all__'
