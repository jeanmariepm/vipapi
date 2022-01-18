from rest_framework import serializers
from .models import Deal, Player, Review


class DealSerializer(serializers.ModelSerializer):
    # player = serializers.JSONField()

    class Meta:
        model = Deal
        fields = ['id', 'hands', 'auction', 'player',
                  'username',  'saved_date']
        read_only_fields = ['username',  'saved_date']

    username = serializers.SerializerMethodField(method_name='getUserName')

    def getUserName(self, deal):
        return deal.player.user.username


class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = ['id', 'user', 'username', 'deals_count', 'level']

    username = serializers.SerializerMethodField(method_name='getUserName')

    def getUserName(self, player):
        return player.user.username

    deals_count = serializers.SerializerMethodField(
        method_name='getDealsCount')

    def getDealsCount(self, player):
        return player.deals_count


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'saved_date', 'reviewer', 'reviewer_name', 'content']

    reviewer_name = serializers.SerializerMethodField(
        method_name='getReviewerName')

    def getReviewerName(self, review):
        return review.reviewer.user.username

    def create(self, validated_data):
        deal_id = self.context['deal_id']
        return Review.objects.create(deal_id=deal_id, **validated_data)
