from django.urls import path
from .views import *

urlpatterns = [
    path('user', UserView.as_view()),
    path('create-user', CreateUserView.as_view()),
    path('get-user/', UserDataView.as_view(), name='get-user'),
    path('delete-user/', DeleteUserView.as_view(), name='delete-user'),
    path('create-item', CreateItem.as_view()),
    path('item', ItemView.as_view())
]
