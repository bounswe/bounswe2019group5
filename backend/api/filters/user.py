from django_filters import rest_framework as filters

from ..models import User


class UserFilterSet(filters.FilterSet):

    class Meta:
        model = User
        fields = ('username',)
