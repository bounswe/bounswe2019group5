from rest_framework import serializers

from ..models.exam_result import ExamResult, ProficiencyExamResult
from .question import QuestionAnswerSerializer

class ProficiencyExamResultSerializer(serializers.ModelSerializer):
    answers = QuestionAnswerSerializer(many=True)

    class Meta:
        model = ProficiencyExamResult
        fields = ('id', 'level', 'answers')



