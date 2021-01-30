from django.apps import AppConfig
from django.contrib.auth.models import User


class IdeasConfig(AppConfig):
    name = 'ideas'
    AUTH_USER_MODEL = User

