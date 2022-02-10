from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, mixins
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.http import HttpResponse
from rest_framework.decorators import permission_classes
from .serializers import UserSerializer


class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        new_user = User.objects.create_user(**serializer.validated_data)
        new_user.set_password(serializer.validated_data['password'])
        return new_user


class GetUserID(viewsets.GenericViewSet, mixins.ListModelMixin):
    def list(self, request, *args, **kwargs):
        return JsonResponse({'user_id': request.user.id})
