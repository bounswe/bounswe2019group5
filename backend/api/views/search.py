from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend

from ..serializers import ExerciseSerializer
from ..models import Exercise
from ..filters import SearchFilterSet


class SearchView(mixins.ListModelMixin,
                 GenericViewSet):
    serializer_class = ExerciseSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filterset_class = SearchFilterSet
    queryset = Exercise.objects.all()

