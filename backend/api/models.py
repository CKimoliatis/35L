from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model):
    first_name = models.CharField(max_length=50, default="")
    last_name = models.CharField(max_length=50, default="")
    email = models.CharField(max_length=50, default="",unique=True)
    password = models.CharField(max_length=128)  # Increased max_length for hashed password
    school = models.CharField(max_length=100, default="")
    username = models.CharField(max_length=100, default="",unique=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)


class Item(models.Model):
    user_id = models.CharField(max_length=100, default="")
    title = models.CharField(max_length=100, default="")
    description = models.TextField()
    category = models.CharField(max_length=50, default="")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    sold_flag = models.BooleanField(default=False)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='item_images/', null=True, blank=True)

class Watchlist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='watchlist')
    items = models.ManyToManyField(Item)

    def __str__(self):
        return f"{self.user.username}'s Watchlist"
    
class Chat(models.Model):
    user_id = models.IntegerField()
    recipient_id = models.IntegerField()


class Message(models.Model):
    sender_id = models.IntegerField()
    message_content = models.CharField(max_length=1000,default='')
    chat_id = models.IntegerField()

