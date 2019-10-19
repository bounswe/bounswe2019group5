from rest_framework import serializers
from .models import Question, QuestionOption, ProficiencyExam


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ('text',)


class QuestionSerializer(serializers.ModelSerializer):
    question_options = QuestionOptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'text', 'question_options')


class ProficiencyExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = ProficiencyExam
        fields = ('id', 'language', 'questions')
