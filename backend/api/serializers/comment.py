from rest_framework import serializers

from ..models import Comment


class CommentSerializer(serializers.ModelSerializer):
    rate = serializers.IntegerField()

    class Meta:
        model = Comment
        fields = ('username', 'comment', 'rate')
