from django.urls import path
from .views import (ListAllEntityAPIView, ListEntityGroupAPIView, ListEntityNameAPIView, RetrieveEntityAPIView,
                    AddEntityAPIView, UpdateEntityAPIView,)


urlpatterns = [
    path("entities/", ListAllEntityAPIView.as_view()),
    path("entities/<str:group>/", ListEntityGroupAPIView.as_view()),
    path("entity/name/<str:name>/", ListEntityNameAPIView.as_view()),
    path("entity/<int:pk>/", RetrieveEntityAPIView.as_view()),
    path("add-entity/", AddEntityAPIView.as_view()),
    path("update-entity/<int:pk>/", UpdateEntityAPIView.as_view()),
]
