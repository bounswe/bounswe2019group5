from rest_framework import serializers

from .question import QuestionSerializer
from ..models import ProficiencyExam


class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)


class ProficiencyExamSerializer(ExamSerializer):

    class Meta:
        model = ProficiencyExam
        fields = ('id', 'language', 'questions')