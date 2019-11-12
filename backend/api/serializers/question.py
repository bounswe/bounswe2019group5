from rest_framework import serializers

from ..models.question import *


class QuestionSerializer(serializers.ModelSerializer):

    body = serializers.SerializerMethodField()

    class Meta:
        model = AbstractQuestion
        fields = ('id', 'body', 'options')

    def get_body(self, instance):
        if hasattr(instance, 'question'):
            return instance.question.body
        else:
            url = instance.listeningquestion.body.url
            request = self.context.get('request', None)
            return request.build_absolute_uri(url)
