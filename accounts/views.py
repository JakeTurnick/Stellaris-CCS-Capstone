from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .models import Plan, User, Profile
from heavens.models import Constellation
from .serializers import PlanSerializer, CustomUserSerializer, UserConstellationSerializer

# Create your views here.


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


class PlanDetailAPIView(generics.RetrieveAPIView):
    serializer_class = PlanSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Plan.objects.filter(pk=pk)


class MyPlanListAPIView(generics.ListAPIView):
    serializer_class = PlanSerializer

    def get_queryset(self):
        return Plan.objects.filter(user=self.request.user)
