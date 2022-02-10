from django.contrib.auth.models import Permission
from django.db.models import query
from rest_framework import status
from rest_framework.generics import DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework_simplejwt import serializers

from .models import Bookmark
from .serializers import BookmarkSerializer


class BookmarkViewSet(mixins.CreateModelMixin,
                      mixins.DestroyModelMixin,
                      mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        return super().perform_create(serializer)


class RemoveBookmark(DestroyAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def destroy(self, request, *args, **kwargs):
        self.queryset.filter(
            user=request.user, post__id=request.data['post']['id']).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
