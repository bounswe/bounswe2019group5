from django_filters import rest_framework as filters
from django.db.models import Q


class MessageFilterSet(filters.FilterSet):

    username = filters.CharFilter(method='filter_user',
                                  label='conservations with user')

    @staticmethod
    def filter_user(queryset, name, value):

        received = Q(owner__username=value)
        transmitted = Q(username__username=value)
        return queryset.filter(received | transmitted)
