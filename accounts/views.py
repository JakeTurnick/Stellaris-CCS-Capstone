from django.shortcuts import render
from rest_framework import generics
from .models import Plan
from .serializers import PlanSerializer

# Create your views here.


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
