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
        fields = ('id','commentor','comment','rate')


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('language')

        
class UserProfileSerializer(serializers.ModelSerializer):
    userComments = CommentSerializer(many=True)
    userAttendedLangs = LanguageSerializer(many=True)
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','nativeLanguage')
