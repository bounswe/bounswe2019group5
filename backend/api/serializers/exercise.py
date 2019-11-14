from rest_framework import serializers

from .question import QuestionSerializer
from ..models import *


class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ('id', 'questions',
                  'type', 'language', 'level', 'tags', 'keywords', 'is_published')
        read_only_fields = ('id',)

    def get_fields(self):
        fields = super().get_fields()
        view = self.context.get('view')

        if 'SearchView' in str(view):

            for i in list(fields):
                if i != 'id' and i != 'questions':
                    fields.pop(i, None)
            return fields

        if 'update' not in view.action:
            fields.pop('is_published')

        return fields

    def create(self, validated_data):

        questions = validated_data.pop('questions')
        validated_data['is_published'] = False
        instance: Exercise = Exercise.objects.create(**validated_data)

        for question_data in questions:
            question_data['exam'] = instance
            Question.objects.create(**question_data)
        return instance


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

    author = serializers.CharField(source='author.username', default=None)
    reviewer = serializers.CharField(source='reviewer.username', default=None)

    class Meta:
        model = Essay
        fields = ('id', 'type', 'language', 'writing', 'reviewer', 'author', 'status')


class EssayCreateSerializer(serializers.HyperlinkedModelSerializer):

    author = serializers.CharField(read_only=True, required=False)
    reviewer = serializers.CharField(required=False)

    class Meta:
        model = Essay
        fields = ('id', 'type', 'language', 'writing', 'reviewer', 'author', 'status')
        read_only_fields = ('type',)

    def get_fields(self):
        fields = super().get_fields()
        if self.context.get('view').action == 'create':
            fields['status'].read_only = True
        return fields

    def validate(self, attrs):
        request_data = self.context.get('request').data
        attrs['type'] = 'writing'
        attrs['author'] = self.context.get('request').user
        if 'reviewer' in request_data:
            attrs['reviewer'] = User.objects.get(username=request_data.get('reviewer'))
        return super().validate(attrs)

    def create(self, validated_data):
        validated_data['status'] = 'created'
        return super().create(validated_data)
