from rest_framework import serializers

from .question import QuestionSerializer
from ..models import *


class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ('id', 'questions')


class ResultSerializer(serializers.HyperlinkedModelSerializer):

    @staticmethod
    def answers_to_array(result):
        return [i.answer for i in result.exercise.questions.all()]

    id = serializers.IntegerField(write_only=True)
    answers = serializers.ListField(write_only=True, child=serializers.CharField())
    correct_answer = serializers.SerializerMethodField('answers_to_array')
    level = serializers.CharField(read_only=True, source='user.level')

    class Meta:
        model = Result
        fields = ('id', 'answers', 'level', 'correct_answer')

    def create(self, data):
        if not data.get('id') and not data.get('answers'):
            raise serializers.ValidationError('id and answers are needed')

        solved_exercise = Exercise.objects.get(id=data.get('id'))
        correct_answer = [i.answer for i in solved_exercise.questions.all()]
        number_of_true = len(set(correct_answer) & set(data.get('answers')))
        number_of_false = len(correct_answer) - number_of_true

        result = {
            'user': self.context.get('request').user,
            'exercise': solved_exercise,
            'number_of_true': number_of_true,
            'number_of_false': number_of_false
        }
        result, created = Result.objects.get_or_create(**result)
        if not created:
            raise serializers.ValidationError('exercise has already solved')

        return result
