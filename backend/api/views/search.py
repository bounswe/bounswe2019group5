from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend

from ..serializers import ExerciseSerializer
from ..models import Exercise, Result
from ..filters import SearchFilterSet


class SearchView(mixins.ListModelMixin,
                 GenericViewSet):
    serializer_class = ExerciseSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filterset_class = SearchFilterSet

    def get_queryset(self):
        user = self.request.user

        exercise_seen = Result.objects.filter(user=user).values_list('exercise_id')

        exercises = Exercise.objects.filter(level=self.request.user.level).exclude(id__in=exercise_seen)
        return exercises
