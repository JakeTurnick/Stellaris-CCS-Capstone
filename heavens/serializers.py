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
    is_tracked = serializers.SerializerMethodField()

    class Meta:
        model = Constellation
        fields = '__all__'
        depth = 1

    def get_is_tracked(self, obj):
        if not self.context['request'].user.is_anonymous:
            user = self.context['request'].user
            is_tracked = user.tracked_constellations.filter(id=obj.id).exists()
            return is_tracked
        return False


class CometSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comet
        fields = '__all__'


class MeteorShowerSerializer(serializers.ModelSerializer):
    is_tracked = serializers.SerializerMethodField()

    class Meta:
        model = MeteorShower
        fields = '__all__'

    def get_is_tracked(self, obj):
        if not self.context['request'].user.is_anonymous:
            user = self.context['request'].user
            is_tracked = user.tracked_meteor_showers.filter(id=obj.id).exists()
            return is_tracked
        return False


class PlanetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planet
        fields = '__all__'
