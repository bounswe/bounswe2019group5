from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import *

from ..serializers import ExerciseSerializer
from ..models import Exercise, Result
from ..filters import SearchFilterSet


class SearchView(mixins.RetrieveModelMixin,
                 mixins.ListModelMixin,
                 GenericViewSet):
    serializer_class = ExerciseSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filterset_class = SearchFilterSet

    def get_queryset(self):
        user = self.request.user

        exercise_seen = Result.objects.filter(user=user).values_list('exercise_id')
        exercise_seen = [i[0] for i in exercise_seen]

        exercises = (Exercise.objects
                     .exclude(id__in=exercise_seen)
                     .exclude(is_published=False))

        if self.action != 'retrieve':
            if 'language' not in self.request.query_params:
                raise ParseError('language parameter is necessary')
            else:
                exercises = exercises.filter(level=self.request.user.levels[
                    self.request.query_params['language']
                ])

        return exercises
