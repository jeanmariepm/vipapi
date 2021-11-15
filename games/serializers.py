from rest_framework import serializers
from .models import Deal, Player


class DealSerializer(serializers.ModelSerializer):
    # player = serializers.JSONField()

    class Meta:
        model = Deal
        fields = ['id', 'hands', 'auction', 'player', 'username', 'saved_date']
        read_only_fields = ['user_name', 'saved_date']

    username = serializers.SerializerMethodField(method_name='getUserName')

    def getUserName(self, deal):
        return deal.player.user.username


class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = ['id', 'user', 'username',  'level']

    username = serializers.SerializerMethodField(method_name='getUserName')

    def getUserName(self, player):
        return player.user.username
