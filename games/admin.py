from django.contrib import admin
from .models import Deal, Player


class DealAdmin(admin.ModelAdmin):
    list_display = ("hands", "auction")


class PlayerAdmin(admin.ModelAdmin):
    list_display = ("user", "level")


# Register your models here.
admin.site.register(Deal, DealAdmin)
admin.site.register(Player, PlayerAdmin)
