from django.contrib import admin
from django.db.models.aggregates import Count
from django.utils.html import format_html
from .models import Deal, Player
from django.utils.http import urlencode
from django.urls import reverse


@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = ("auction", "username", "saved_date")
    list_per_page = 3
    list_filter = ['saved_date']

    @ admin.display(ordering='username')
    def username(self, deal):
        return deal.player.user.username


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ["username", "first_name",
                    "last_name", "level", "deals_count"]
    list_editable = ["level"]
    list_fetch_related = ["user"]
    search_fields = ["user__username__istartswith"]

    @admin.display(ordering='deals_count')
    def deals_count(self, player):
        url = (
            reverse('admin:games_deal_changelist')
            + '?' + urlencode({
                'player__id': str(player.id)
            })
        )
        return format_html('<a href="{}"> {} </a>', url, player.deals_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            deals_count=Count('deals')
        )

    @ admin.display(ordering='first_name')
    def first_name(self, player):
        return player.user.first_name

    @ admin.display(ordering='last_name')
    def last_name(self, player):
        return player.user.last_name

    @ admin.display(ordering='username')
    def username(self, player):
        return player.user.username
