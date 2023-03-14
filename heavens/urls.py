from django.urls import path
from .views import (
    # Any views
    StarListAPIView, StarListNameAPIView, StarRetrieveAPIView,
    ConstellationListAPIView, ConstellationListNameAPIView, ConstellationRetrieveAPIView,
    CometListAPIView, CometListNameAPIView, CometRetrieveAPIView,
    MeteorShowerListAPIView, MeteorShowerListNameAPIView, MeteorShowerRetrieveAPIView,
    PlanetListAPIView, PlanetListNameAPIView, PlanetRetrieveAPIView,
    # Admin views
    StarAddAPIView, StarUpdateAPIView, StarDestroyAPIView,
    ConstellationAddAPIView, ConstellationUpdateAPIView, ConstellationDestroyAPIView,
    CometAddAPIView, CometUpdateAPIView, CometDestroyAPIView,
    MeteorShowerAddAPIView, MeteorShowerUpdateAPIView, MeteorShowerDestroyAPIView,
    PlanetAddAPIView, PlanetUpdateAPIView, PlanetDestroyAPIView,
    # Old Entity views (any & admin)
    ListAllEntityAPIView, ListEntityGroupAPIView, ListEntityNameAPIView, RetrieveEntityAPIView,
    AddEntityAPIView, UpdateEntityAPIView,)


urlpatterns = [
    # Any urls
    path("stars/", StarListAPIView.as_view()),
    path("stars/name/<str:name>/", StarRetrieveAPIView.as_view()),
    path("stars/<str:name>/", StarListNameAPIView.as_view()),

    path("constellations/", ConstellationListAPIView.as_view()),
    path("constellations/name/<str:name>/",
         ConstellationRetrieveAPIView.as_view()),
    path("constellations/<str:name>/", ConstellationListNameAPIView.as_view()),

    path("comets/", CometListAPIView.as_view()),
    path("comets/name/<str:name>/", CometRetrieveAPIView.as_view()),
    path("comets/<str:name>/", CometListNameAPIView.as_view()),

    path("meteor-showers/", MeteorShowerListAPIView.as_view()),
    path("meteor-showers/name/<str:name>/",
         MeteorShowerRetrieveAPIView.as_view()),
    path("meteor-showers/<str:name>/", MeteorShowerListNameAPIView.as_view()),

    path("planets/", PlanetListAPIView.as_view()),
    path("planets/name/<str:name>/", PlanetRetrieveAPIView.as_view()),
    path("planets/<str:name>/", PlanetListNameAPIView.as_view()),

    # Admin urls
    path("add/Star/", StarAddAPIView.as_view()),
    path("update/Star/", StarUpdateAPIView.as_view()),
    path("destroy/Star/", StarDestroyAPIView.as_view()),

    path("add/Constellation/", ConstellationAddAPIView.as_view()),
    path("update/Constellation/", ConstellationUpdateAPIView.as_view()),
    path("destroy/Constellation/", ConstellationDestroyAPIView.as_view()),

    path("add/Comet/", CometAddAPIView.as_view()),
    path("update/Comet/", CometUpdateAPIView.as_view()),
    path("destroy/Comet/", CometDestroyAPIView.as_view()),

    path("add/MeteorShower/", MeteorShowerAddAPIView.as_view()),
    path("update/MeteorShower/", MeteorShowerUpdateAPIView.as_view()),
    path("destroy/MeteorShower/", MeteorShowerDestroyAPIView.as_view()),

    path("add/Planet/", PlanetAddAPIView.as_view()),
    path("update/Planet/", PlanetUpdateAPIView.as_view()),
    path("destroy/Planet/", PlanetDestroyAPIView.as_view()),

    path("entities/", ListAllEntityAPIView.as_view()),
    path("entities/<str:group>/", ListEntityGroupAPIView.as_view()),
    path("entity/name/<str:name>/", ListEntityNameAPIView.as_view()),
    path("entity/<int:pk>/", RetrieveEntityAPIView.as_view()),
    path("add-entity/", AddEntityAPIView.as_view()),
    path("update-entity/<int:pk>/", UpdateEntityAPIView.as_view()),
]
