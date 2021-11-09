from django.urls import path
from rest_framework import routers
from .views import DealViewSet, PlayerViewSet

app_name = "games"


router = routers.DefaultRouter()
router.register("deals", DealViewSet, basename="deals")
router.register("players", PlayerViewSet, basename="players")


urlpatterns = router.urls
