from django.db.models import query
from django.shortcuts import render
from rest_framework import request, viewsets, mixins, permissions
from rest_framework.response import Response

from .models import Post
from .serializers import PostSerializer
from bookmarks.models import Bookmark
from django.middleware.csrf import get_token


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        return super().perform_create(serializer)

    def get_serializer_context(self):
        return {"user_id": self.request.user.id}


class SearchPostViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = PostSerializer

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}

    def get_queryset(self):
        search_query = self.request.query_params['search_query']
        return Post.objects.filter(text__iregex=search_query)


class BookmarkedPostViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):

        bookmarked_posts_ids = Bookmark.objects.filter(
            user__id__exact=self.request.user.id).values_list('post')
        return Post.objects.filter(id__in=bookmarked_posts_ids)

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}
