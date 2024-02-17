from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer, CreateUserSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response

class UserView(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        queryset= User.objects.all()
        serializer=self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class CreateUserView(APIView):
    serializer_class = CreateUserSerializer
    def post(self, request, format = None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            if User.objects.filter(email=email).exists():
                return Response({'error': 'User with this email already exists.'},
                                status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
        
