from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# class User(models.Model):
#     first_name = models.CharField(max_length=50, default="")
#     last_name = models.CharField(max_length=50, default="")
#     email = models.CharField(max_length=50, default="")
#     password = models.CharField(max_length=128)  # Increased max_length for hashed password
#     school = models.CharField(max_length=100, default="")
#     username = models.CharField(max_length=100, default="")

#     def set_password(self, raw_password):
#         self.password = make_password(raw_password)

#     def check_password(self, raw_password):
#         return check_password(raw_password, self.password)
    
# class Item(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     description = models.TextField()

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


