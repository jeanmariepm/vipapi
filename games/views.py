from rest_framework.viewsets import ModelViewSet

from .models import Deal, Player
from .serializers import DealSerializer, PlayerSerializer


class DealViewSet(ModelViewSet):
    queryset = Deal.objects.all()
    serializer_class = DealSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class PlayerViewSet(ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def get_serializer_context(self):
        return {'request': self.request}
