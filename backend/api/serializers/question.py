from rest_framework import serializers

from ..models.question import *


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('id', 'body', 'options', 'answer')

    def get_fields(self):
        fields = super().get_fields()
        if 'SearchView' in str(self.context.get('view')):
            del fields['answer']
        return fields


class FileSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = File
        fields = ('file',)
