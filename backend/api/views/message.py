from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from ..serializers import *


class MessageView(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    serializer_class = MessageSerializer

