from rest_framework import serializers
from .models import Plan
from dj_rest_auth.serializers import TokenSerializer, TokenModel
from rest_framework.authtoken.models import Token
from .models import User, Profile


class CustomTokenSerializer(TokenSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    display_name = serializers.ReadOnlyField(source="profile.display_name")
    default_zip = serializers.ReadOnlyField(source="profile.default_zip")
    is_superuser = serializers.ReadOnlyField(source="user.is_superuser")

    class Meta(TokenSerializer.Meta):
        model = Token
        fields = TokenSerializer.Meta.fields + \
            ('username', 'display_name', 'is_superuser', 'default_zip',)


class CustomUserSerializer(serializers.ModelSerializer):
    pass


class PlanSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    creator = serializers.ReadOnlyField(source="creator.display_name")

    class Meta:
        model = Plan
        fields = ['title', 'notes', 'date', 'creator', 'username']
