from rest_framework import serializers

from .question import QuestionSerializer
from ..models import Exercise, Exam


class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Exam
        fields = ('id', 'questions')


class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ('id', 'questions')

