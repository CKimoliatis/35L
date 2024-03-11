
from django.urls import path, re_path
from .views import index
from . import views

urlpatterns = [
    path('', index),
    path('login', index),
    path('signup', index),
    path('landing', index),
    path('postItem', index),
    path('inventory', index),
    path('my-listings', index),
    path('post/:encodedData', index),
    re_path(r'^post/.*$', index),
    path('path/:id', index),
    path('my-watchlist', index),
    path('my-account', index)
]
