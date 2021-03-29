from games.models import Deal
from rest_framework import viewsets, permissions
from .serializers import DealSerializer


class DealViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = DealSerializer

    def get_queryset(self):
        return Deal.objects.all().order_by("-saved_date")

    def perform_create(self, serializer):
        serializer.save()
