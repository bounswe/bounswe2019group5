from django_filters import rest_framework as filters

from ..models import Exercise, Exam


class ExerciseFilterSet(filters.FilterSet):

    class Meta:
        model = Exercise
        fields = ('language', 'type')


class ExamFilterSet(filters.FilterSet):

    class Meta:
        model = Exam
        fields = ('language',)
