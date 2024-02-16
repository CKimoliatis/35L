from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=50, default="")
    last_name = models.CharField(max_length=50, default="")
    email = models.CharField(max_length=50, default="")
    password = models.CharField(max_length=9, default="")
    school = models.CharField(max_length=100, default="")
    username = models.CharField(max_length=100, default="")

