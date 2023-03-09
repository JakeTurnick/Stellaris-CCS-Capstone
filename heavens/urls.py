from django.urls import path
from .views import (ListEntityAPIView, RetrieveEntityAPIView,
                    AddEntityAPIView, UpdateEntityAPIView,)


urlpatterns = [
    path("entities/", ListEntityAPIView.as_view()),
    path("entity/<int:pk>/", RetrieveEntityAPIView.as_view()),
    path("add-entity/", AddEntityAPIView.as_view()),
    path("update-entity/<int:pk>/", UpdateEntityAPIView.as_view()),
]
