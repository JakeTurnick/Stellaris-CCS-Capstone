from django.urls import path
from .views import PlanListAPIView, PlanDetailAPIView, MyPlanListAPIView


urlpatterns = [
    path('myplans/', MyPlanListAPIView.as_view()),
    path('plan/<int:pk>/', PlanDetailAPIView.as_view()),
    path('plans/', PlanListAPIView.as_view()),

]
