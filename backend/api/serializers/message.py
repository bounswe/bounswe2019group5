from rest_framework import serializers

from ..models import *


class MessageSerializer(serializers.HyperlinkedModelSerializer):

    username = serializers.CharField(write_only=True)
    to_username = serializers.CharField(read_only=True, source='username.username')
    from_username = serializers.CharField(read_only=True, source='owner.username')

    class Meta:
        model = Message
        fields = ('username', 'to_username', 'from_username', 'text', 'date')

