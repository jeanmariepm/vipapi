from django.urls import path
from rest_framework_nested import routers
from .views import DealViewSet, PlayerViewSet, ReviewViewSet

app_name = "games"


router = routers.DefaultRouter()
router.register("deals", DealViewSet, basename="deals")
router.register("players", PlayerViewSet, basename="players")

deals_router = routers.NestedDefaultRouter(
    router, 'deals', lookup='deal')
deals_router.register('reviews', ReviewViewSet,
                      basename='deal-reviews')

urlpatterns = router.urls + deals_router.urls
