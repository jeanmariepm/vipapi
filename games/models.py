from django.db import models


class Deal(models.Model):
    hands = models.CharField(max_length=255)
    bid = models.CharField(max_length=10)
    username = models.CharField(max_length=32)
