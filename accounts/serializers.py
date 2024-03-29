from rest_framework import serializers
from .models import Plan
from dj_rest_auth.serializers import TokenSerializer, TokenModel, UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework.authtoken.models import Token
from .models import User, Profile
from django.core.validators import MinValueValidator, MaxValueValidator


class CustomTokenSerializer(TokenSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    display_name = serializers.ReadOnlyField(source="profile.display_name")
    default_zip = serializers.ReadOnlyField(source="user.default_zip")
    is_superuser = serializers.ReadOnlyField(source="user.is_superuser")
    pk = serializers.ReadOnlyField(source="user.pk")

    class Meta(TokenSerializer.Meta):
        model = Token
        fields = TokenSerializer.Meta.fields + \
            ('username', 'is_superuser', 'default_zip', 'display_name', 'pk')


class CustomUserDetailSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + \
            ('default_zip', 'is_superuser',)


class ProfileDetailSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Profile
        fields = ["display_name", "user", "pk",
                  "avatar", "phone_number", "default_zip", "bio"]
        # depth = 1


class CustomUserSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    # display_name = serializers.ReadOnlyField(source="profile.display_name")
    default_zip = serializers.ReadOnlyField(source="user.default_zip")
    is_superuser = serializers.ReadOnlyField(source="user.is_superuser")
    tracked_stars = serializers.ReadOnlyField(source="user.tracked_stars")
    tracked_constellations = serializers.ReadOnlyField(
        source="user.tracked_constellations")
    tracked_comets = serializers.ReadOnlyField(source="user.tracked_comets")
    tracked_meteor_showers = serializers.ReadOnlyField(
        source="user.tracked_meteor_showers")
    tracked_planets = serializers.ReadOnlyField(source="user.tracked_planets")

    class Meta:
        model = User
        fields = "__all__"


class CustomRegisterSerializer(RegisterSerializer):
    default_zip = serializers.CharField(max_length=10)

    def custom_signup(self, request, user):
        user.default_zip = self.validated_data.get('default_zip', '')
        user.save(update_fields=['default_zip'])


class PlanSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    # creator = serializers.ReadOnlyField(source="creator.display_name")

    class Meta:
        model = Plan
        fields = ['title', 'notes', 'date', 'username', 'event', 'pk']


class UserConstellationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['tracked_constellations',]
        depth = 1


class UserStarSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['tracked_stars',]
        depth = 1


class UserCometSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['tracked_comets',]
        depth = 1


class UserMeteorShowerSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['tracked_meteor_showers',]
        depth = 1
