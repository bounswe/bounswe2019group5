from rest_framework import serializers

from ..models.question import *


class QuestionSerializer(serializers.ModelSerializer):

    body = serializers.SerializerMethodField()

    class Meta:
        model = AbstractQuestion
        fields = ('id', 'body', 'options', 'answer', 'exam')

    def get_body(self, instance):
        if hasattr(instance, 'question'):
            return instance.question.body
        else:
            url = instance.listeningquestion.body.url
            request = self.context.get('request', None)
            return request.build_absolute_uri(url)

    def get_fields(self):
        fields = super().get_fields()
        if 'SearchView' in str(self.context.get('view')):
            del fields['answer']
            del fields['exam']
        return fields
