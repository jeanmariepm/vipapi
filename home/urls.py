from django.contrib.auth import views as auth_views
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.views.static import serve
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from . import views
from .views import index


app_name = "home"
urlpatterns = [
    path("", views.index),
]
