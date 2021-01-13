from django.contrib import admin
from .models import Genre, Book

class BookAdmin(admin.ModelAdmin):
  list_display = ('title', 'pub_date')

# Register your models here.
admin.site.register(Genre)
admin.site.register(Book, BookAdmin)