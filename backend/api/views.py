from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer, CreateUserSerializer, ItemSerializer
from .models import User, Item
from rest_framework.views import APIView
from rest_framework.response import Response
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
        print("Username: ", username)
        print("Password: ", password)
        user = authenticate(username=username, password=password)
        if user is not None:
            # A backend authenticated the credentials
            serializer = UserSerializer(user)
            print(serializer.data)
            return Response(serializer.data)
        else:
            # No backend authenticated the credentials
            return Response({'error': 'Invalid login'}, status=status.HTTP_401_UNAUTHORIZED)
        
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
            print("Here")
        else:
            items = Item.objects.all()
            print("Here2")

        # Serialize items
        serializer = ItemSerializer(items, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    
        user_id = request.query_params.get('user_id')
        queryset = Item.objects.filter(user_id=user_id)  # Filter items by user ID
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
