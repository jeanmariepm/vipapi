from django.apps import AppConfig
from django.contrib.auth.models import User


class BooksConfig(AppConfig):
    name = 'books'
    AUTH_USER_MODEL = User

