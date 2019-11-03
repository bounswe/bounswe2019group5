from rest_framework import mixins
from rest_framework.exceptions import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from ..serializers import *
from ..models import *
from ..filters import MessageFilterSet


class MessageView(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filterset_class = MessageFilterSet

    def get_queryset(self):
        accessible = (Q(owner=self.request.user)
                      | Q(username=self.request.user))
        return Message.objects.filter(accessible)

    def check_object_permissions(self, request, obj):
        if request.user.is_anonymous:
            raise NotAuthenticated('Token is needed')

    def create(self, request, *args, **kwargs):
        new_message = {
            'owner': request.user,
            'username': User.objects.get(username=request.data.get('username')),
            'text': request.data.get('text')
        }
        new_message = Message.objects.create(**new_message)

        serializer = MessageSerializer(new_message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


