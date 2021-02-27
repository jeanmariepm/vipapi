from django.db import models


class Deal(models.Model):
    hands = models.CharField(max_length=255)
    bid = models.CharField(max_length=10)
    username = models.CharField(max_length=32)
    ai_bid = models.CharField(max_length=10)

    def save(self, *args, **kwargs):
        self.ai_bid = "NB"
        print("Settingai_bid to NB")
        super(Deal, self).save(*args, **kwargs)
