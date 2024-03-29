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
        return f'{self.user.first_name} {self.user.last_name} {self.user.email}'

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


class Review(models.Model):
    deal = models.ForeignKey(
        Deal, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(
        Player,  null=True, on_delete=models.SET_NULL, related_name='reviewed_deals')
    content = models.TextField()
    saved_date = models.DateField(auto_now_add=True)
