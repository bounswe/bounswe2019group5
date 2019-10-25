from rest_framework import serializers

from .comment import CommentSerializer
from ..models import User


class ProfileSerializer(serializers.ModelSerializer):
    user_comments = CommentSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
                  'native_lang', 'attended_langs',
                  'rating_average', 'user_comments')
