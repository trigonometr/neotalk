from rest_framework import serializers
from .models import Bookmark
from neotalk.serializers import UserSerializer
from posts.models import Post
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Post
        fields = ['id']


class BookmarkSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = PostSerializer()

    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'creation_time', 'post']

    def create(self, validated_data):
        instance, isUpdated = Bookmark.objects.update_or_create(user=validated_data['user'], post=Post.objects.get(
            pk=validated_data['post']['id']))
        return instance
