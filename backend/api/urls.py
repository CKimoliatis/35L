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
    path('delete-item/<int:pk>', DeleteItem.as_view(), name='delete-item'),
    path('add-item-to-watchlist', AddToWatchlist.as_view()),
    path('fetch-item-from-watchlist/', FetchWatchlistItems.as_view(), name="fetch-items-watchlist"),
    path('fetch-in-watchlist', FetchInWatchlist.as_view(), name='fetch-in-watchlist'),
    path('remove-from-watchlist', RemoveItemFromWatchlist.as_view(), name='remove-from-watchlist'),
    path('update-item/<int:pk>', UpdateItem.as_view(), name='update-item'),
    path('update-user/', UpdateUserView.as_view(), name='update-user'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('chats/messages/', ChatMessages.as_view(), name='chat-messages'),
    path('get-chats',UserChats.as_view()),
    path('create-chat',CreateChatView.as_view()),
    path('create-message',CreateMessageView.as_view()),
    path('get-specific-user',SpecificUserView.as_view()),
    path('get-new-chat-id',GetMaxChatID.as_view()),
]
