from django.contrib import admin
from .models import Idea

class IdeaAdmin(admin.ModelAdmin):
  list_display = ('title', 'posted_by')

# Register your models here.
admin.site.register(Idea, IdeaAdmin)