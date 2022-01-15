from django.contrib import admin
from django.db.models.aggregates import Count
from .models import Deal, Player
from django.utils.html import format_html
from django.urls import reverse


@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = ("hands", "auction")
    list_per_page = 3


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "level", "deals_count"]
    list_editable = ["level"]
    list_fetch_related = ["user"]

    @admin.display(ordering='deals_count')
    def deals_count(self, player):
        url = reverse('admin:games_deal_changelist')
        return format_html('<a href="{}"> {} </a>', url, player.deals_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            deals_count=Count('deals')
        )

    @admin.display(ordering='first_name')
    def first_name(self, player):
        return player.user.first_name

    @admin.display(ordering='last_name')
    def last_name(self, player):
        return player.user.last_name
