from django_filters import rest_framework as filters

from ..models import User


class UserFilterSet(filters.FilterSet):

    class Meta:
        model = User
        fields = ('username',)


class RecommendationFilterSet(filters.FilterSet):

    language = filters.CharFilter(method='filter_language')

    username = filters.CharFilter(method='filter_username')

    @staticmethod
    def filter_language(queryset, name, value):
        return queryset.filter(native_language=value)

    @staticmethod
    def filter_username(queryset, name, value):
        return queryset.filter(username__icontains=value)
