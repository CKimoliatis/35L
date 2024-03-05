from django.contrib.auth.hashers import check_password
from .models import User

def authenticate(username=None, password=None):
    try:
        user = User.objects.get(username=username)
        if user.check_password(password):
            return user
        elif user:
            #user exists, incorrect password
            return -1
    except User.DoesNotExist:
        return None
