from rest_framework import serializers

from .comment import CommentSerializer
from ..models import User

languageChoices = [
    ('english', 'english'),
    ('turkish', 'turkish'),
    ('german', 'german')
]


class ProfileSerializer(serializers.ModelSerializer):
    user_comments = CommentSerializer(many=True)
    rating_average = serializers.IntegerField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
                  'native_language', 'attended_langs',
                  'rating_average', 'user_comments')


class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    surname = serializers.CharField(write_only=True)
    native_language = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)

    class Meta:
        model = User

        fields = ('name', 'surname', 'username', 'password', 'email', 'native_language', 'token')
        extra_kwargs = {
            'name': {'required': True},
            'surname': {'required': True},
            'username': {'required': True, 'write_only': True},
            'password': {'write_only': True,  # password is never read
                         'style': {'input_type': 'password'}},
            'email': {'required': True, 'write_only': True},
            'native_language': {'required': True}
        }


class LoginSerializer(serializers.ModelSerializer):
    email_username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)

    class Meta:
        model = User

        fields = ('email_username', 'password', 'token')
