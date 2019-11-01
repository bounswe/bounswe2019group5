from rest_framework import serializers

from ..models.question import QuestionOption, Question, QuestionAnswer


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ('text',)


class QuestionSerializer(serializers.ModelSerializer):
    question_options = QuestionOptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'text', 'question_options')

class QuestionAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuestionAnswer
        fields = ('answer', 'outcome')
