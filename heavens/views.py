from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Entity
from .models import Star, Constellation, Comet, MeteorShower, Planet
from .serializers import EntitySerializer
from .serializers import StarSerializer, ConstellationSerializer, CometSerializer, MeteorShowerSerializer, PlanetSerializer

# Create your views here.


class ListAllEntityAPIView(generics.ListAPIView):
    queryset = Entity.objects.all()
    serializer_class = EntitySerializer
    permission_classes = (AllowAny,)


class ListEntityGroupAPIView(generics.ListAPIView):
    serializer_class = EntitySerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        group = self.kwargs['group']
        return Entity.objects.filter(e_type=group)


class ListEntityNameAPIView(generics.ListAPIView):
    serializer_class = EntitySerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Entity.objects.filter(name=name)


class RetrieveEntityAPIView(generics.RetrieveAPIView):
    serializer_class = EntitySerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Entity.objects.filter(pk=pk)


class AddEntityAPIView(generics.CreateAPIView):
    serializer_class = EntitySerializer
    permission_classes = (IsAdminUser,)


class UpdateEntityAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = EntitySerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Entity.objects.filter(pk=pk)


# User available views - List / Retrieve any entity
# Accounts.models.User -> Add tracked list


# Stars
class StarListAPIView(generics.ListAPIView):
    queryset = Star.objects.all()
    serializer_class = StarSerializer
    permission_classes = (AllowAny,)


class StarCreateAPIView(generics.CreateAPIView):
    queryset = Star.objects.all()
    serializer_class = StarSerializer

    def create(self, request, *args, **kwargs):
        # get the constellation name from the request data
        constellation_name = request.data.pop('constellation')

        # try to get the existing constellation or create a new one if it doesn't exist
        constellation, _ = Constellation.objects.get_or_create(
            name=constellation_name)

        # create the star instance with the associated constellation
        star = Star.objects.create(
            constellation=constellation,
            **request.data
        )

        # serialize the created star and return the response
        serializer = self.get_serializer(star)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def bulk_create(self, request, *args, **kwargs):
        pass


class StarListNameAPIView(generics.ListAPIView):
    serializer_class = StarSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Star.objects.filter(name=name)


class StarRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = StarSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Star.objects.filter(name=name)


# Constellations
class ConstellationListAPIView(generics.ListAPIView):
    queryset = Constellation.objects.all()
    serializer_class = ConstellationSerializer
    permission_classes = (AllowAny,)


@api_view(['GET'])
def avg_ra_dec(request):
    return Response({"avg_right_ascension": "avg_ra", "avg_declination": "avg_dec"})


class ConstellationListNameAPIView(generics.ListAPIView):
    serializer_class = ConstellationSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Constellation.objects.filter(name=name)


class ConstellationRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = ConstellationSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Constellation.objects.filter(name=name)


# Comets
class CometListAPIView(generics.ListAPIView):
    queryset = Comet.objects.all()
    serializer_class = CometSerializer
    permission_classes = (AllowAny,)


class CometListNameAPIView(generics.ListAPIView):
    serializer_class = CometSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Comet.objects.filter(name=name)


class CometRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = CometSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Comet.objects.filter(name=name)


# Meteor Showers
class MeteorShowerListAPIView(generics.ListAPIView):
    queryset = MeteorShower.objects.all()
    serializer_class = MeteorShowerSerializer
    permission_classes = (AllowAny,)


class MeteorShowerListNameAPIView(generics.ListAPIView):
    serializer_class = MeteorShowerSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return MeteorShower.objects.filter(name=name)


class MeteorShowerRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = MeteorShowerSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return MeteorShower.objects.filter(name=name)


# Planets
class PlanetListAPIView(generics.ListAPIView):
    queryset = Planet.objects.all()
    serializer_class = PlanetSerializer
    permission_classes = (AllowAny,)


class PlanetListNameAPIView(generics.ListAPIView):
    serializer_class = PlanetSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Planet.objects.filter(name=name)


class PlanetRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = PlanetSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Planet.objects.filter(name=name)


# Admin views - Create / Update / Destroy

# Stars
class StarAddAPIView(generics.CreateAPIView):
    serializer_class = StarSerializer
    permission_classes = (IsAdminUser,)


class StarUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = StarSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Star.objects.filter(pk=pk)


class StarDestroyAPIView(generics.DestroyAPIView):
    serializer_class = StarSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Star.objects.filter(name=name)

# Constellation


class ConstellationAddAPIView(generics.CreateAPIView):
    serializer_class = ConstellationSerializer
    permission_classes = (IsAdminUser,)


class ConstellationUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ConstellationSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Constellation.objects.filter(pk=pk)


class ConstellationDestroyAPIView(generics.DestroyAPIView):
    serializer_class = ConstellationSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Constellation.objects.filter(name=name)

# Comets


class CometAddAPIView(generics.CreateAPIView):
    serializer_class = CometSerializer
    permission_classes = (IsAdminUser,)


class CometUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = CometSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Comet.objects.filter(pk=pk)


class CometDestroyAPIView(generics.DestroyAPIView):
    serializer_class = CometSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Comet.objects.filter(name=name)

# MeteorShower


class MeteorShowerAddAPIView(generics.CreateAPIView):
    serializer_class = MeteorShowerSerializer
    permission_classes = (IsAdminUser,)


class MeteorShowerUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = MeteorShowerSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        pk = self.kwargs['pk']
        return MeteorShower.objects.filter(pk=pk)


class MeteorShowerDestroyAPIView(generics.DestroyAPIView):
    serializer_class = MeteorShowerSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        name = self.kwargs['name']
        return MeteorShower.objects.filter(name=name)

# Planet


class PlanetAddAPIView(generics.CreateAPIView):
    serializer_class = PlanetSerializer
    permission_classes = (IsAdminUser,)


class PlanetUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = PlanetSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Planet.objects.filter(pk=pk)


class PlanetDestroyAPIView(generics.DestroyAPIView):
    serializer_class = PlanetSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        name = self.kwargs['name']
        return Planet.objects.filter(name=name)
