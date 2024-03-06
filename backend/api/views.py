from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import User, Item
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Min, Max
from .auth import authenticate


class UserView(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        queryset= User.objects.all()
        serializer=self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
class CreateUserView(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserDataView(APIView):
    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            if user == -1:
                return Response({'error': 'Incorrect password'} )
            # A backend authenticated the credentials
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            # No backend authenticated the credentials
            return Response({'error': 'User not found'})
        
class DeleteUserView(APIView):
    def delete(self, request, format=None):
        username = request.query_params.get('username')
        try:
            user = User.objects.get(username=username)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, 
                            status=status.HTTP_404_NOT_FOUND)
        except User.MultipleObjectsReturned:
            return Response({'error': 'Multiple users found with the same username'}, 
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CreateItem(APIView):
    serializer_class = ItemSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ItemView(APIView):
    serializer_class = ItemSerializer
    def get(self, request, format=None):
        queryset= Item.objects.all()
        serializer=self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
class FetchItemsAPIView(APIView):
    serializer_class = ItemSerializer
    def get(self, request, format=None):
            
        search_query = request.query_params.get('searchQuery', '') 

        if search_query:
            items = Item.objects.filter(user_id__icontains=search_query) 
        else:
            items = Item.objects.all()

        # Serialize items
        serializer = ItemSerializer(items, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class FetchItemsListing(APIView):
    def get(self, request, format=None):
        print('request', request)
        search_query = request.query_params.get('searchQuery', '') 
        min_price = request.query_params.get('minPrice')
        max_price = request.query_params.get('maxPrice')
        user_id = request.query_params.get('userId')

        if search_query:
            items = Item.objects.filter(
                title__icontains=search_query,
                price__gte=min_price,
                price__lte=max_price,
            ).exclude(id=user_id)
        else:
            items = Item.objects.filter(
                price__gte=min_price,
                price__lte=max_price,
            ).exclude(id=user_id)

        # Serialize items
        serializer = ItemSerializer(items, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class MinMaxPriceView(APIView):
    def get(self, request, format=None):
        min_price = Item.objects.all().aggregate(Min('price'))['price__min']
        max_price = Item.objects.all().aggregate(Max('price'))['price__max']
        return Response({'minPrice': min_price, 'maxPrice': max_price})

class CategoryView(APIView):
    serializer_class = CategorySerializer
    def get(self, request, format=None):
        queryset= Category.objects.all()
        serializer=self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class AddCategory(APIView):
    serializer_class = CategorySerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)