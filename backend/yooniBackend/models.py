# backend/models.py
from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=255)
    password = models.CharField(max_length=255)  # You should use a more secure method for storing passwords in a real-world scenario

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
