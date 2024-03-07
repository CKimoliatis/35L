from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import User, Item, Watchlist
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
    
class FetchItemsListing(APIView):
    def get(self, request, format=None):
        search_query = request.query_params.get('searchQuery', '') 

        if search_query:
            items = Item.objects.filter(title__icontains=search_query) 
        else:
            items = Item.objects.all()

        # Serialize items
        serializer = ItemSerializer(items, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AddToWatchlist(APIView):
        def post(self, request, format=None):
            user_id = request.data.get('user_id')
            item_id = request.data.get('item_id')

            if not user_id or not item_id:
                return Response({'success': False, 'message': 'User ID and item ID are required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                user = User.objects.get(pk=user_id)
                watchlist, created = Watchlist.objects.get_or_create(user=user)
                watchlist.items.add(item_id)
                return Response({'success': True}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'success': False, 'message': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'success': False, 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class FetchWatchlistItems(APIView):
     def get(self, request, format=None):
        user_id = request.query_params.get('user_id')

        if not user_id:
            return Response({'message': 'user_id parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(pk=user_id)
            watchlist, created = Watchlist.objects.get_or_create(user=user)
            watchlist_items = watchlist.items.all()

            # Serialize the watchlist items using ItemSerializer
            item_serializer = ItemSerializer(watchlist_items, many=True)
            return Response(item_serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FetchInWatchlist(APIView):
    def get(self, request, format=None):
        user_id = request.query_params.get('user_id')
        item_id = request.query_params.get('item_id')

        if not user_id or not item_id:
            return Response({'error': 'user_id and item_id are required query parameters'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
            item = Item.objects.get(id=item_id)
            watchlist, created = Watchlist.objects.get_or_create(user=user)
            in_watchlist = watchlist.items.filter(id=item_id).exists()
            return Response({'in_watchlist': in_watchlist})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        except Watchlist.DoesNotExist:
            return Response({'error': 'Watchlist not found for the user'}, status=status.HTTP_404_NOT_FOUND)
        
class RemoveItemFromWatchlist(APIView):
    def post(self, request):
        # Get user_id and item_id from request data
        user_id = request.data.get('user_id')
        item_id = request.data.get('item_id')

        # Check if user_id and item_id are provided
        if not user_id or not item_id:
            return Response({"error": "Both user_id and item_id are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get the item
            item = Item.objects.get(pk=item_id)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get the user's watchlist
        try:
            watchlist = Watchlist.objects.get(user_id=user_id)
        except Watchlist.DoesNotExist:
            return Response({"error": "Watchlist not found"}, status=status.HTTP_404_NOT_FOUND)

        # Remove the item from the watchlist
        watchlist.items.remove(item)

        return Response({"message": "Item removed from watchlist"}, status=status.HTTP_200_OK)