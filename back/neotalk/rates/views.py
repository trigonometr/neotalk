from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import DestroyAPIView

from .models import Rate
from .serializers import RateSerializer


class RateViewSet(viewsets.ModelViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        return super().perform_create(serializer)


class RemoveRate(DestroyAPIView):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer

    def destroy(self, request, *args, **kwargs):
        self.queryset.filter(
            user=request.user, reply__id=request.data['reply']['id']).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
