from django.db import models
from datetime import datetime


class Deal(models.Model):
    hands = models.CharField(max_length=255)
    auction = models.CharField(max_length=255)
    username = models.CharField(max_length=32)
    saved_date = models.DateTimeField(default=datetime.now)
