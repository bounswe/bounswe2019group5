from rest_framework import serializers

from ..models.question import *


class BodyField(serializers.CharField):

    def get_attribute(self, instance):
        if hasattr(instance, 'question'):
            return instance.question.body
        else:
            url = instance.listeningquestion.body.url
            request = self.context.get('request', None)
            return request.build_absolute_uri(url)


class QuestionSerializer(serializers.ModelSerializer):

    body = BodyField()

    class Meta:
        model = AbstractQuestion
        fields = ('id', 'body', 'options', 'answer', 'exam')

    def get_fields(self):
        fields = super().get_fields()
        if 'SearchView' in str(self.context.get('view')):
            del fields['answer']
            del fields['exam']
        return fields
