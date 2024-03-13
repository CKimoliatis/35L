from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'password',
                  'school', 'username')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password',
                  'school', 'username')

    def create(self, validated_data):
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            school=validated_data['school'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
        
class WatchlistSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = Watchlist
        fields = ('user', 'items')
        
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('user_id','recipient_id')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('sender_id','message_content','chat_id')

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class AddSchoolSerialier(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('school_name','school_image')
        