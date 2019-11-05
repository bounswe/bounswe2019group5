from django_filters import rest_framework as filters
from django.db.models import Q


class SearchFilterSet(filters.FilterSet):

    tag = filters.CharFilter(method='filter_tag',
                             label='search exercise with tag')
    keyword = filters.CharFilter(method='filter_keyword')

    language = filters.CharFilter(method='filter_language')

    type = filters.CharFilter(method='filter_type')

    @staticmethod
    def filter_tag(queryset, name, value):
        tag = Q(tags__contains=[value])
        return queryset.filter(tag)

    @staticmethod
    def filter_keyword(queryset, name, value):
        keyword = Q(keywords__contains=[value])
        return queryset.filter(keyword)

    @staticmethod
    def filter_language(queryset, name, value):
        language = Q(language=value)
        return queryset.filter(language)

    @staticmethod
    def filter_type(queryset, name, value):
        type = Q(type=value)
        return queryset.filter(type)
