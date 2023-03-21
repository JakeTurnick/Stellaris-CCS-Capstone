from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .models import Plan, User, Profile
from heavens.models import (Star, Constellation, Comet, MeteorShower, Planet)
from .serializers import (CustomUserSerializer, ProfileDetailSerializer,
                          PlanSerializer,
                          UserStarSerializer, UserConstellationSerializer,
                          UserCometSerializer, UserMeteorShowerSerializer)

# Create your views here.


class UserStarDetailAPIView(APIView):

    def get(self, request):
        serializer = UserStarSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        star_id = request.data['star']
        star = Constellation.objects.get(pk=star_id)
        user.tracked_constellations.add(star)
        user.save()
        serializer = UserConstellationSerializer(user)
        return Response(serializer.data)


class UserConstellationDetailAPIView(APIView):

    def get(self, request):
        serializer = UserConstellationSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        constellation_id = request.data['constellation']
        constellation = Constellation.objects.get(pk=constellation_id)
        user.tracked_constellations.add(constellation)
        user.save()
        serializer = UserConstellationSerializer(user)
        return Response(serializer.data)

    def delete(self, request):
        user = request.user
        constellation_id = request.data['constellation']
        constellation = Constellation.objects.get(pk=constellation_id)
        user.tracked_constellations.remove(constellation)
        user.save()
        serializer = UserConstellationSerializer(user)
        return Response(serializer.data)


class UserMeteorShowerDetailAPIView(APIView):

    def get(self, request):
        serializer = UserMeteorShowerSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        meteor_shower_id = request.data['meteorShower']
        meteor_shower = MeteorShower.objects.get(pk=meteor_shower_id)
        user.tracked_meteor_showers.add(meteor_shower)
        user.save()
        serializer = UserMeteorShowerSerializer(user)
        return Response(serializer.data)

    def delete(self, request):
        user = request.user
        meteor_shower_id = request.data['meteorShower']
        meteor_shower = MeteorShower.objects.get(pk=meteor_shower_id)
        user.tracked_meteor_showers.remove(meteor_shower)
        user.save()
        serializer = UserMeteorShowerSerializer(user)
        return Response(serializer.data)

# class UserConstellationUpdateAPIView(generics.UpdateAPIView):


class UserCometDetailAPIView(APIView):

    def get(self, request):
        serializer = UserCometSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        comet_id = request.data['comet']
        comet = Comet.objects.get(pk=comet_id)
        user.tracked_comets.add(comet)
        user.save()
        serializer = UserCometSerializer(user)
        return Response(serializer.data)


class UserPlanAPIView(APIView):

    def get(self, request):
        serializer = PlanSerializer(request.user)
        return Response(serializer.data)

    # def put(self, request):
    #     user = request.user
    #     plan_id = request.data['plan']
    #     plan = Plan.objects.get(pk=plan_id)
    #     user.plans.add(plan)
    #     user.save()
    #     serializer = PlanSerializer(user)
    #     return Response(serializer.data)


class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileDetailSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Profile.objects.filter(pk=pk)

# class UserProfileAPIView(generics.ListAPIView):
#     serializer_class = ProfileDetailSerializer

#     def get_queryset(self):
#         return Profile.objects.filter(user=self.request.user)
#   Should I create a "operation" kwarg to specify (add/remove) item
#   OR Create a seperate view


class UserListAPIView(generics.ListAPIView):
    serializer_class = CustomUserSerializer
    queryset = User.objects.all()
    permission_classes = (IsAdminUser,)


class UserAPIView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return User.objects.filter(pk=pk)


class AddPlanAPIView(generics.CreateAPIView):
    serializer_class = PlanSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PlanListAPIView(generics.ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

    def get_queryset(self):
        return Plan.objects.filter(user=self.request.user)


class PlanDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = PlanSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Plan.objects.filter(pk=pk)


class MyPlanListAPIView(generics.ListAPIView):
    serializer_class = PlanSerializer

    def get_queryset(self):
        return Plan.objects.filter(user=self.request.user)
