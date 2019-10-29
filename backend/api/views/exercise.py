from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import *

from ..models import Exercise
from ..serializers import ExerciseSerializer
from ..filters import ExerciseFilterSet


class ExerciseView(mixins.ListModelMixin,
                   GenericViewSet):
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ExerciseFilterSet

    def check_object_permissions(self, request, obj):
        if request.user.is_anonymous:
            raise NotAuthenticated('Token is needed')


