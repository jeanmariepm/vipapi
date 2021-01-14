from django.urls import path

from . import views

app_name="books"
urlpatterns = [
    path("", views.index, name="index"),
    path("add", views.add, name="add"),
    path("<int:book_id>", views.detail, name="detail"),
]

