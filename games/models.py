from django.db import models
from django.contrib.auth.models import User

class Deal(models.Model):
    hands = models.CharField(max_length=100)
    bid = models.CharField(max_length=10)
    owner = models.ForeignKey(
        User, related_name="owner_deals", on_delete=models.CASCADE, null=True)
