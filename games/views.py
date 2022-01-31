from django.db.models.aggregates import Count
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Deal, Player, Review
from .serializers import DealSerializer, PlayerSerializer, ReviewSerializer


class DealViewSet(ModelViewSet):
    queryset = Deal.objects.all()
    serializer_class = DealSerializer
    # permission_classes = [IsAuthenticated]

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
            Player.objects.create(user_id=user_id)
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
    queryset = Player.objects.annotate(
        deals_count=Count('deals')).all()

    serializer_class = PlayerSerializer
    # permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}


class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(deal_id=self.kwargs['deal_pk'])

    def get_serializer_context(self):
        return {'deal_id': self.kwargs['deal_pk']}
