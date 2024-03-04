
from django.urls import path
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
    path('post/<str:encoded_data>/', views.post_item, name='post_item')
    path('path/:id', index)
    
]
