import json
import requests
from django.db.models import Q
from django_filters import rest_framework as filters


class SearchFilterSet(filters.FilterSet):
    tag = filters.CharFilter(method='filter_tag',
                             label='search exercise with tag')
    keyword = filters.CharFilter(method='filter_keyword')

    language = filters.CharFilter(method='filter_language')

    type = filters.CharFilter(method='filter_type')

    @staticmethod
    def filter_tag(queryset, name, value):
        def get_related_tags(given_tag):
            binary_response = requests.get('https://api.datamuse.com/words?ml=' + given_tag)
            decoded_response = binary_response.content.decode('utf8').replace("'", '"')
            json_response = json.loads(decoded_response)
            related_tags = [i.get('word') for i in json_response]
            return related_tags

        tag = Q(tags__contains=[value])
        tag_related = Q(tags__overlap=get_related_tags(value))
        return queryset.filter(tag | tag_related)

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
