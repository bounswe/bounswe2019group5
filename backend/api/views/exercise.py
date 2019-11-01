from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.exceptions import *
from rest_framework.permissions import IsAuthenticated

from ..serializers import *


class ExerciseView(mixins.CreateModelMixin,
                   GenericViewSet):
    serializer_class = TakeExerciseSerializer
    permission_classes = (IsAuthenticated,)

    def check_object_permissions(self, request, obj):
        if request.user.is_anonymous:
            raise NotAuthenticated('Token is needed')


class ResultView(mixins.CreateModelMixin,
                 GenericViewSet):

    serializer_class = ResultSerializer
    permission_classes = (IsAuthenticated,)

    def check_object_permissions(self, request, obj):
        if request.user.is_anonymous:
            raise NotAuthenticated('Token is needed')
