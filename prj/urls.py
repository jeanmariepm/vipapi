from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('home/', include('home.urls')),
    path('', include('home.urls')),
    path('ideas/', include('ideas.urls')),
    path('games/', include('games.urls')),
]
