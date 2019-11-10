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


class EssaySerializer(serializers.HyperlinkedModelSerializer):

    reviewer = serializers.CharField(source='reviewer.username', default=None)

    class Meta:
        model = Essay
        fields = ('id', 'type', 'language', 'writing', 'reviewer')


class EssayCreateSerializer(serializers.HyperlinkedModelSerializer):

    reviewer = serializers.CharField(required=False)

    class Meta:
        model = Essay
        fields = ('id', 'type', 'language', 'writing', 'reviewer')
        read_only_fields = ('type',)

    def validate(self, attrs):
        request_data = self.context.get('request').data
        attrs['type'] = 'writing'
        attrs['author'] = self.context.get('request').user
        if 'reviewer' in request_data:
            attrs['reviewer'] = User.objects.get(username=request_data.get('reviewer'))
        return super().validate(attrs)

