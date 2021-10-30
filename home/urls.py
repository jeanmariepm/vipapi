from django.contrib.auth import views as auth_views
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.views.static import serve
from django.conf.urls import url
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from . import views
from .views import UserList, index


app_name = "home"
urlpatterns = [
    path("signup/", UserList.as_view()),
    path("login/", TokenObtainPairView),
    path("refresh_token/", TokenRefreshView),
    path("", views.index),
]
