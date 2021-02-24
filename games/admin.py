from django.contrib import admin
from .models import Deal


class DealAdmin(admin.ModelAdmin):
    list_display = ("hands", "bid")


# Register your models here.
admin.site.register(Deal, DealAdmin)