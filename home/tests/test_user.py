from django.test import client
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User

import pytest


@pytest.mark.django_db(transaction=True)
class TestUserCredentials:
    def test_anonymous_browse_users(self):
        client = self.setup()
        response = client.get(
            '/auth/users/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        print('browse_users data:', response.data)

    def test_authenticate_user(self):
        client = self.setup()
        response = client.post(
            '/auth/jwt/create/',
            {'username': 'user_name',
             'password': 'pass_word'})
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['refresh']) > 0
        assert len(response.data['access']) > 0

    def setup(self):
        User.objects.create_user(
            'user_name', 'user_email@netclass.com', 'pass_word')
        assert User.objects.count() == 1

        return APIClient()
