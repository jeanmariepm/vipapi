from django.contrib.auth import views as auth_views
from django.urls import path, include

from . import views
from .views import current_user, UserList


app_name = "home"
urlpatterns = [
    path("current_user/", current_user),
    path("users/", UserList.as_view()),
    # remove what follows
    path("", views.index, name="index"),
    path("login/", auth_views.LoginView.as_view(), name="login"),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),
    path("register/", views.register, name="register"),
]
