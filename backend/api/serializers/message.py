from rest_framework import serializers

from ..models import *


class MessageSerializer(serializers.HyperlinkedModelSerializer):

    to_username = serializers.CharField(read_only=True, source='username.username')
    from_username = serializers.CharField(read_only=True, source='owner.username')

    class Meta:
        model = Message
        fields = ('to_username', 'from_username', 'text', 'date')

