from rest_framework import serializers

from .question import QuestionSerializer
from ..models import ProficiencyExam


class ProficiencyExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = ProficiencyExam
        fields = ('id', 'language', 'questions')
