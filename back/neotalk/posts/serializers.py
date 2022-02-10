from datetime import timezone
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post
from replies.models import Reply
from replies.serializers import ReplySerializer
from neotalk.serializers import UserSerializer
from bookmarks.models import Bookmark
from datetime import datetime, timezone, timedelta


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    is_owner = serializers.SerializerMethodField(
        'get_is_owner', read_only=True)
    replies_set = serializers.SerializerMethodField(
        'get_replies', read_only=True)
    best_reply = serializers.SerializerMethodField(
        'get_best_reply', read_only=True)
    liked = serializers.SerializerMethodField('is_liked', read_only=True)
    likes = serializers.SerializerMethodField('add_likes', read_only=True)
    replies = serializers.SerializerMethodField('add_replies', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'is_owner', 'creation_time',
                  'category', 'text', 'replies', 'likes', 'liked', 'best_reply', 'replies_set']

    def get_best_reply(self, post):
        best_reply = post.add_rate().order_by('-rate')[:1]
        return ReplySerializer(best_reply, many=True, context={"user_id": self.context["user_id"]}, read_only=True).data

    def get_replies(self, post):
        return ReplySerializer(post.add_rate(), many=True, context={"user_id": self.context["user_id"]}, read_only=True).data

    def add_likes(self, post):
        return Bookmark.objects.filter(post__id__exact=post.id).count()

    def add_replies(self, post):
        return post.reply_set.count()

    def is_liked(self, post):
        if not self.context['user_id']:
            return False
        return (post.bookmarked_post.filter(user__id__exact=self.context['user_id']).count() == 1)

    def get_is_owner(self, post):
        return (post.user.id == self.context['user_id'])
