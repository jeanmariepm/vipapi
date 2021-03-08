from django.contrib.auth import views as auth_views
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token
from django.views.static import serve
from django.conf.urls import url


from . import views
from .views import UserList, index


app_name = "home"
urlpatterns = [
    path("signup/", UserList.as_view()),
    path("login/", obtain_jwt_token),
    path("refresh_token/", refresh_jwt_token),
    url(r"(?P<page>^\w+.html/$)", views.index),
]
