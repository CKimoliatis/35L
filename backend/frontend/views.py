from django.shortcuts import render
from django.http import HttpResponse
import json

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')





def post_item(request):
    encoded_data = request.GET.get('encodedData')
    decoded_data = json.loads(encoded_data)
    
    # Now you can access the decoded data like decoded_data['itemId'], decoded_data['itemImage'], etc.
    
    return HttpResponse("This is the post_item view")