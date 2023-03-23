from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import (AddPlanAPIView, PlanListAPIView,
                    PlanDetailAPIView, MyPlanListAPIView,
                    UserAPIView, UserListAPIView,
                    CreateUserProfileAPIView,
                    UserProfileAPIView,
                    UserStarDetailAPIView,
                    UserConstellationDetailAPIView,
                    UserCometDetailAPIView,
                    UserMeteorShowerDetailAPIView,
                    UserPlanAPIView,)


urlpatterns = [
    path("user/add-plan/", AddPlanAPIView.as_view()),
    path("user/plans/", PlanListAPIView.as_view()),
    path("user/new-profile", CreateUserProfileAPIView.as_view()),
    path("user/profile/<int:pk>/", UserProfileAPIView.as_view()),
    path('user/stars/', UserStarDetailAPIView.as_view()),
    path('user/constellations/', UserConstellationDetailAPIView.as_view()),
    path('user/comets/', UserCometDetailAPIView.as_view()),
    path('user/meteor-showers/', UserMeteorShowerDetailAPIView.as_view()),
    path('myplans/', MyPlanListAPIView.as_view()),
    path('user/plans/<int:pk>/', PlanDetailAPIView.as_view()),
    path('plans/', PlanListAPIView.as_view()),
    path('allusers/', UserListAPIView.as_view()),

]
