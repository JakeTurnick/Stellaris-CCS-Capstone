from django.urls import path
from .views import (AddPlanAPIView, PlanListAPIView,
                    PlanDetailAPIView, MyPlanListAPIView,
                    UserAPIView, UserListAPIView,
                    UserStarDetailAPIView,
                    UserConstellationDetailAPIView,
                    UserCometDetailAPIView,
                    UserMeteorShowerDetailAPIView,)


urlpatterns = [
    path("add-plan/", AddPlanAPIView.as_view()),
    path('user/stars/', UserStarDetailAPIView.as_view()),
    path('user/constellations/', UserConstellationDetailAPIView.as_view()),
    path('user/comets/', UserCometDetailAPIView.as_view()),
    path('user/meteor-showers/', UserMeteorShowerDetailAPIView.as_view()),
    path('myplans/', MyPlanListAPIView.as_view()),
    path('plan/<int:pk>/', PlanDetailAPIView.as_view()),
    path('plans/', PlanListAPIView.as_view()),
    path('allusers/', UserListAPIView.as_view()),

]
