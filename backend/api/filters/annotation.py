from django_filters import rest_framework as filters
from django.db.models import Q


class AnnotationFilterSet(filters.FilterSet):

    source = filters.CharFilter(method='filter_target')

    @staticmethod
    def filter_target(queryset, name, value):
        return queryset.filter(target__source=value)
