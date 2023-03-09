from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Entity
from .serializers import EntitySerializer

# Create your views here.


class ListEntityAPIView(generics.ListAPIView):
    queryset = Entity.objects.all()
    serializer_class = EntitySerializer
    permission_classes = (AllowAny,)


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
