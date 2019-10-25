from rest_framework import serializers

from ..models import  User, ProficiencyExam, Language


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('language')