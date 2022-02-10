from django.contrib.auth.models import User
from django.http.request import RAISE_ERROR
from rest_framework import serializers

from .models import Reply
from neotalk.serializers import UserSerializer
from posts.models import Post
from rates.models import Rate


class ReplyToSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(allow_null=True)
    user = UserSerializer(allow_null=True)

    class Meta:
        model = Reply
        fields = ['id', 'user']


class PostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Post
        fields = ['id']


class ReplySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    is_owner = serializers.SerializerMethodField(
        'get_is_owner', read_only=True)
    post = PostSerializer()
    reply_to = ReplyToSerializer(allow_null=True)
    likes = serializers.SerializerMethodField('get_likes', read_only=True)
    dislikes = serializers.SerializerMethodField(
        'get_dislikes', read_only=True)
    user_rate = serializers.SerializerMethodField('get_rate', read_only=True)

    class Meta:
        model = Reply
        fields = ['id', 'user', 'is_owner', 'reply_to', 'creation_time',
                  'text', 'post', 'likes', 'dislikes', 'user_rate']

    def get_is_owner(self, reply):
        return (reply.user.id == self.context['user_id'])

    def get_likes(self, reply):
        return reply.rated_reply.filter(type__exact=True).count()

    def get_dislikes(self, reply):
        return reply.rated_reply.filter(type__exact=False).count()

    def get_rate(self, reply):
        user_rate = reply.rated_reply.filter(
            user__id__exact=self.context['user_id'])
        amount = user_rate.count()
        if amount == 0:
            return None
        return user_rate.get().type

    def check_reply_belongs_to_post(self, reply_to, post_id):
        if reply_to.post.id != post_id:
            raise TypeError(
                f"Reply by id {reply_to.id} doesn't belong to post by id {post_id}")

    def create(self, validated_data):
        post = Post.objects.get(pk=validated_data['post']['id'])

        reply_to_id = validated_data['reply_to']['id']
        reply_to = None
        if reply_to_id != None:
            reply_to = Reply.objects.get(
                pk=reply_to_id)
            self.check_reply_belongs_to_post(reply_to, post.id)

        return Reply.objects.create(user=validated_data['user'],
                                    reply_to=reply_to,
                                    text=validated_data['text'],
                                    post=post)

    def update(self, instance, validated_data):
        instance.text = validated_data['text']
        instance.save()
        return instance
