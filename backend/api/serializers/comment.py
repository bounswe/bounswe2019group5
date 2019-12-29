from django.db.models import Avg
from rest_framework import serializers

from ..models import Comment, User


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('username', 'comment', 'rate')

    def validate(self, attrs):
        attrs['commented_user'] = User.objects.get(username=attrs['username'])
        attrs['username'] = self.context.get('request').user.username
        return attrs

    def create(self, validated_data):
        instance = super().create(validated_data)

        avg = Comment.objects\
            .filter(commented_user=instance.commented_user)\
            .aggregate(rating_average=Avg('rate'))

        User.objects\
            .filter(username=instance.commented_user.username)\
            .update(rating_average=avg['rating_average'])

        return instance
