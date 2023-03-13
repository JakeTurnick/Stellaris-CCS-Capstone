from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Entity
from .serializers import EntitySerializer

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
