from rest_framework.generics import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Deal, Player
from .serializers import DealSerializer, PlayerSerializer


class DealViewSet(ModelViewSet):
    queryset = Deal.objects.all()
    serializer_class = DealSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

    def list(self, request):
        queryset = Deal.objects.all()
        if request.query_params:
            user_id = request.query_params.get('user_id', None)
            if user_id:
                queryset = queryset.filter(player_id=user_id)
        serializer = DealSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        user_id = request.user.id
        if not Player.objects.all().filter(user_id=user_id).exists():
            Player.objects.create(user=user_id)
        player = Player.objects.get(user_id=user_id)
        request.data['player'] = player.id
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        user_id = request.user.id
        id = request.data.id
        deal = Deal.objects.get(id=id)
        if deal and deal.player.user_id == user_id:
            return super().destroy(request, *args, **kwargs)
        return Response('Deal not deleted', status=status.HTTP_400_BAD_REQUEST)


class PlayerViewSet(ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

    def retrieve(self, request, pk=None):
        queryset = Player.objects.all()
        player = get_object_or_404(queryset, user_id=pk)
        serializer = PlayerSerializer(player)
        return Response(serializer.data)
