from django_filters import rest_framework as filters
from django.db.models import Q

from ..models import Exercise, Exam


class ExerciseFilterSet(filters.FilterSet):

    class Meta:
        model = Exercise
        fields = ('language', 'type')


class ExamFilterSet(filters.FilterSet):

    class Meta:
        model = Exam
        fields = ('language',)


class ResultFilterSet(filters.FilterSet):

    language = filters.CharFilter(method='filter_language')

    type = filters.CharFilter(method='filter_type')

    level = filters.CharFilter(method='filter_level')

    @staticmethod
    def filter_language(queryset, name, value):
        language = Q(exercise__language=value)
        return queryset.filter(language)

    @staticmethod
    def filter_type(queryset, name, value):
        exercise_type = Q(exercise__type=value)
        return queryset.filter(exercise_type)

    @staticmethod
    def filter_level(queryset, name, value):
        level = Q(exercise__level=value)
        return queryset.filter(level)
