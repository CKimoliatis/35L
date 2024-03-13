from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import User, Item, Watchlist
from rest_framework.views import APIView
from rest_framework.response import Response
from .auth import authenticate
from django.db.models import Min, Max



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
    
class DeleteItem(APIView):
    def delete(self, request, pk):
        print('pk is:',pk)
        try:
            item = Item.objects.get(pk=pk)
            item.delete()

            return Response({'message': 'Item deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

    
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
            watchlist, _ = Watchlist.objects.get_or_create(user=user)  # Ensure watchlist is created if not exist
            item = Item.objects.get(id=item_id)
            in_watchlist = watchlist.items.filter(id=item_id).exists()
            return Response({'in_watchlist': in_watchlist})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

        
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
    
class UpdateItem(APIView):
    serializer_class = ItemSerializer

    def put(self, request, pk):

        item = Item.objects.get(pk=pk)
        serializer = self.serializer_class(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserView(APIView):
    def put(self, request, format=None):
        user_id = request.data.get('id')  # Get user ID from the request data
        try:
            user = User.objects.get(pk=user_id)
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class ChangePasswordView(APIView):
    def post(self, request):
        user = User.objects.get(pk=request.data.get('user_id'))
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'error': 'Incorrect current password.'}, status=status.HTTP_400_BAD_REQUEST)

        if user.check_password(new_password):
            return Response({'error': 'New password must be different from the old password.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'success': 'Password updated successfully.'}, status=status.HTTP_200_OK)
    
class SpecificUserView(APIView):
    serializer_class = UserSerializer

    def get(self, request, format=None):
        user_id = request.query_params.get('user_id')
        user = User.objects.filter(id=user_id).first()

        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(user)
        return Response(serializer.data)

    
class ChatMessages(APIView):
    def get(self, request):
        chat_id = request.query_params.get('chat_id')
        messages = Message.objects.filter(chat_id=chat_id)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
class UserChats(APIView):
    def get(self, request, format=None):
        user_id = request.query_params.get('user_id')  # Assuming you have user authentication set up
        
        chats = []
        # Retrieve all unique chat IDs for the user
        chat_ids = Chat.objects.filter(user_id=user_id)
        recipient_ids = Chat.objects.filter(recipient_id=user_id)
        # Fetch chat details for each unique chat ID
        for chat in chat_ids:
            other_person = User.objects.get(id=chat.recipient_id)
            chat_data = {
                'chat_id': chat.id,
                'other_person_id':chat.recipient_id,
                'other_person_username': other_person.username
                # Add more fields if needed
            }
            chats.append(chat_data)

        for chat in recipient_ids:
            other_person = User.objects.get(id=chat.user_id)
            chat_data = {
                'chat_id': chat.id,
                'other_person_id':chat.recipient_id,
                'other_person_username': other_person.username
                # Add more fields if needed
            }
            chats.append(chat_data)

        return Response(chats, status=status.HTTP_200_OK)
    

class CreateChatView(APIView):
    serializer_class = ChatSerializer

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

class CreateMessageView(APIView):
    serializer_class = MessageSerializer

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
        

class GetMaxChatID(APIView):
    def get(self, request, format=None):
        max_chat_id = Chat.objects.aggregate(Max('id'))['id__max']
        chat_id = max_chat_id + 1 if max_chat_id is not None else 1
        return Response({"chat_id": chat_id})



class AddSchool(APIView):
    serializer_class = AddSchoolSerialier
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetSchools(APIView):
    serializer_class = SchoolSerializer
    def get(self, request, format=None):
        queryset= School.objects.all()
        serializer=self.serializer_class(queryset, many=True)
        return Response(serializer.data)