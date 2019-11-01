from rest_framework import serializers
from rest_framework.exceptions import *

from .question import QuestionSerializer
from ..models import *


class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ('id', 'questions')


class TakeExerciseSerializer(serializers.HyperlinkedModelSerializer):
    languageChoices = [
        ('english', 'english'),
        ('turkish', 'turkish'),
        ('german', 'german')
    ]
    types = [
        ('vocabulary', 'vocabulary'),
        ('grammar', 'grammar'),
        ('reading', 'reading'),
        ('proficiency', 'proficiency'),
    ]
    type = serializers.ChoiceField(choices=types, write_only=True)
    language = serializers.ChoiceField(choices=languageChoices, write_only=True)
    exercise = ExerciseSerializer(read_only=True)

    class Meta:
        model = UserExerciseRelation
        fields = ('exercise', 'language', 'type')

    def create(self, data):
        if not data.get('language') and not data.get('type'):
            raise serializers.ValidationError('language and type are needed')

        user = self.context.get('request').user

        exercise_seen = UserExerciseRelation.objects.filter(user=user).values_list('exercise_id')

        exercise = Exercise.objects.filter(language=data.get('language'),
                                           type=data.get('type')).exclude(id__in=exercise_seen).first()

        if not exercise:
            raise NotFound("No available exercise")

        relation = {
            'user': user,
            'exercise': exercise
        }

        return UserExerciseRelation.objects.create(**relation)


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
            raise NotAcceptable('exercise has already solved')

        return result
