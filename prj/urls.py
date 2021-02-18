from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path("admin/", admin.site.urls),
    path("home/", include("home.urls")),
    path("ideas/", include("ideas.urls")),
    path("games/", include("games.urls")),
    path("fe/", include("fe.urls")),
    path("token-auth/", obtain_jwt_token),
]
