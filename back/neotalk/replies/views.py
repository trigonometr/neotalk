from django.http import request
from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from .models import Reply
from .serializers import ReplySerializer


class ReplyViewSet(viewsets.ModelViewSet):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        return super().perform_create(serializer)

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}
