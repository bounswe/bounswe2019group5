from rest_framework import serializers
from rest_framework.exceptions import NotFound

from .question import QuestionSerializer
from ..models import Exercise, Exam, UserExerciseRelation


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
            'exercise': exercise,
            'is_completed': False
        }

        return UserExerciseRelation.objects.create(**relation)
