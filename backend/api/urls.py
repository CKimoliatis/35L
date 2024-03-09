from django.urls import path
from .views import *

urlpatterns = [
    path('user', UserView.as_view()),
    path('create-user', CreateUserView.as_view()),
    path('get-user/', UserDataView.as_view(), name='get-user'),
    path('delete-user/', DeleteUserView.as_view(), name='delete-user'),
    path('create-item', CreateItem.as_view()),
    path('item', ItemView.as_view()),
    path('parse-item', FetchItemsListing.as_view()),
    path('myitems', FetchItemsAPIView.as_view()),
    path('add-item-to-watchlist', AddToWatchlist.as_view()),
    path('fetch-item-from-watchlist/', FetchWatchlistItems.as_view(), name="fetch-items-watchlist"),
    path('fetch-in-watchlist', FetchInWatchlist.as_view(), name='fetch-in-watchlist'),
    path('remove-from-watchlist', RemoveItemFromWatchlist.as_view(), name='remove-from-watchlist'),
    path('update-item/<int:pk>', UpdateItem.as_view(), name='update-item')
]
