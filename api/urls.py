from django.urls import path, include

urlpatterns = [
    path('accs/', include('accounts.urls')),
]
