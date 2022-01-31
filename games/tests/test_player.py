from django.test import client
from rest_framework.test import APIClient
from rest_framework import status
import pytest


@pytest.mark.django_db(transaction=True)
class TestUserCredentials:
    def test_browse_players(self):
        client = APIClient()
        response = client.get('/games/players/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 0
