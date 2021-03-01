from django.db import models
from . import bid_agent as ba
import json


class Deal(models.Model):
    hands = models.CharField(max_length=255)
    bid = models.CharField(max_length=10)
    username = models.CharField(max_length=32)
    ai_bid = models.CharField(max_length=10)

    def save(self, *args, **kwargs):
        hand = json.loads(self.hands)[3]
        agent = ba.bid_agent(hand)
        self.ai_bid = agent.make_bid()
        super(Deal, self).save(*args, **kwargs)
