from django.urls import path
from .views import (AddPlanAPIView, PlanListAPIView,
                    PlanDetailAPIView, MyPlanListAPIView,)


urlpatterns = [
    path("add-plan/", AddPlanAPIView.as_view()),
    path('myplans/', MyPlanListAPIView.as_view()),
    path('plan/<int:pk>/', PlanDetailAPIView.as_view()),
    path('plans/', PlanListAPIView.as_view()),

]
