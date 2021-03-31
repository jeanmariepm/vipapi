from rest_framework import serializers
from games.models import Deal


class DealSerializer(serializers.ModelSerializer):
    # hands = serializers.JSONField()

    class Meta:
        model = Deal
        fields = "__all__"
