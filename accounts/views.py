from django.shortcuts import render
from rest_framework import generics
from .models import Plan
from .serializers import PlanSerializer

# Create your views here.


class PlanListAPIView(generics.ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlanDetailAPIView(generics.RetrieveAPIView):
    serializer_class = PlanSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Plan.objects.filter(pk=pk)


class MyPlanListAPIView(generics.ListAPIView):
    serializer_class = PlanSerializer

    def get_queryset(self):
        return Plan.objects.filter(user=self.request.user)
