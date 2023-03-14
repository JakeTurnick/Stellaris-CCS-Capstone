from rest_framework import serializers
from .models import Entity
from .models import Star, Constellation, Comet, MeteorShower, Planet


class EntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = '__all__'


class StarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = '__all__'


class ConstellationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = '__all__'


class CometSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = '__all__'


class MeteorShowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = '__all__'


class PlanetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = '__all__'
