from rest_framework import serializers
from .models import *


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


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('username','comment','rate')

        
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','native_lang','attended_langs','rating_average')
    user_comments = CommentSerializer(many=True)
