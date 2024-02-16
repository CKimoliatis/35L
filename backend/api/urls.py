from django.urls import path
from .views import UserView, CreateUserView 

urlpatterns = [
    path('user', UserView.as_view()),
    path('create-user', CreateUserView.as_view())
]
