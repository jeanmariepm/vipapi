from django.test import TestCase
from .models import Deal
from . import bid_agent as ba
from rest_framework.test import RequestsClient
import requests
import json


class DealTestCase(TestCase):
    def setUp(self):
        hands = '[{"S":"T742","H":"52","D":"63","C":"AJ542"},{"S":"KJ965","H":"84","D":"AKQ95","C":"9"},{"S":"Q8","H":"AKQ93","D":"J842","C":"T3"},{"S":"A3","H":"JT76","D":"T7","C":"KQ876"}]'
        deal = Deal(hands=hands, bid="Pass", username="tester", ai_bid="Test")
        deal.save()

        hands = '[{"S":"T742","H":"52","D":"63","C":"AJ542"},{"S":"KJ965","H":"84","D":"AQ975","C":"9"},{"S":"83","H":"AKQ93","D":"J842","C":"T3"},{"S":"AQ","H":"JT76","D":"KT","C":"KQ876"}]'
        deal = Deal(hands=hands, bid="Pass", username="tester", ai_bid="Test")
        deal.save()

        hands = '[{"S":"AK85","H":"A4","D":"AJ762","C":"K2"},{"S":"632","H":"T987","D":"T43","C":"765"},{"S":"QJT74","H":"6","D":"85","C":"AQJ94"},{"S":"9","H":"KQJ532","D":"KQ9","C":"T83"}]'
        deal = Deal(hands=hands, bid="1H", username="tester", ai_bid="Test")
        deal.save()

        hands = '[{"S":"5","H":"KQ8432","D":"5","C":"Q9632"},{"S":"AT9864","H":"96","D":"QT96","C":"A"},{"S":"J73","H":"7","D":"AJ2","C":"KT8754"},{"S":"KQ2","H":"AJT5","D":"K8743","C":"J"}]'
        deal = Deal(hands=hands, bid="1D", username="tester", ai_bid="Test")
        deal.save()

    def testBids(self):
        client = RequestsClient()
        response = client.get("http://localhost:8000/games/api/deals/")
        assert response.status_code == 200
        deals = json.loads(response.text)
        for deal in deals:
            hands = deal["hands"]
            hand = json.loads(hands)[3]
            bid = deal["bid"]
            agent = ba.bid_agent(hand)
            ai_bid = agent.make_bid()

            print(f"agent: {agent}\nai_bid: {ai_bid}")
