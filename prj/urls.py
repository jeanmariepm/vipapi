from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("home.urls")),
    path("games/", include("games.urls")),
    path("login/", obtain_jwt_token),
    path("refresh_token/", refresh_jwt_token),
]
