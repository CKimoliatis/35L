from django.shortcuts import render
from django.http import HttpResponse
import json

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')


