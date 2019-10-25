from rest_framework import serializers

from api.models.comment import Comment
from api.models.exam import ProficiencyExam
from api.models.language import Language
from api.models.question import QuestionOption, Question
from api.models.user import User


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

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('language')

        
class ProfileSerializer(serializers.ModelSerializer):
    user_comments = CommentSerializer(many=True)
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','native_lang','attended_langs','rating_average','user_comments')
    
