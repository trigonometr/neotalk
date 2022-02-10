from rest_framework import serializers
from .models import Rate
from neotalk.serializers import UserSerializer
from replies.models import Reply


class ReplySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Reply
        fields = ['id']


class RateSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    reply = ReplySerializer()

    class Meta:
        model = Rate
        fields = ['id', 'user', 'creation_time', 'reply', 'type']

    def create(self, validated_data):
        instance, _ = Rate.objects.update_or_create(user=validated_data['user'],
                                                    reply=Reply.objects.get(
            pk=validated_data['reply']['id']),
            defaults={'type': validated_data['type']})
        return instance

    def update(self, instance, validated_data):
        instance.type = validated_data['type']
        instance.save()

        return instance
