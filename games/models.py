from django.db import models
from datetime import datetime
from django.contrib import admin
from django.conf import settings


class Player(models.Model):
    LEVEL_BRONZE = 'B'
    LEVEL_SILVER = 'S'
    LEVEL_GOLD = 'G'

    LEVEL_CHOICES = [
        (LEVEL_BRONZE, 'Bronze'),
        (LEVEL_SILVER, 'Silver'),
        (LEVEL_GOLD, 'Gold'),
    ]
    level = models.CharField(
        max_length=1, choices=LEVEL_CHOICES, default=LEVEL_BRONZE)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

    @admin.display(ordering='user__first_name')
    def first_name(self):
        return self.user.first_name

    @admin.display(ordering='user__last_name')
    def last_name(self):
        return self.user.last_name

    class Meta:
        ordering = ['user__first_name', 'user__last_name']
        permissions = [
            ('view_history', 'Can view history')
        ]


class Deal(models.Model):
    hands = models.CharField(max_length=255)
    auction = models.CharField(max_length=255)
    player = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name='deals')
    saved_date = models.DateTimeField(default=datetime.now)
