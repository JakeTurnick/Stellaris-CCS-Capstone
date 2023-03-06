from rest_framework import serializers
from .models import Plan


class PlanSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    creator = serializers.ReadOnlyField(source="creator.display_name")

    class Meta:
        model = Plan
        fields = ['title', 'notes', 'date', 'creator', 'username']
