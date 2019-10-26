import random

from rest_framework import mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from ..models import ProficiencyExam
from ..serializers import ProficiencyExamSerializer


class ProficiencyView(mixins.RetrieveModelMixin,
                      GenericViewSet):
    serializer_class = ProficiencyExamSerializer

    def retrieve(self, request, *args, **kwargs):
        def get_prof_test(language):
            proficiency_exams = ProficiencyExam.objects.filter(language=language)

            if not proficiency_exams:
                return []

            return random.sample(list(proficiency_exams), 1)[0]

        if request.user.is_anonymous:
            return Response({'message': 'session expired'}, status=status.HTTP_401_UNAUTHORIZED)

        prof_test = get_prof_test(kwargs.get('pk'))

        if not prof_test:
            return Response(
                {'message': 'database does not have enough questions for proficiency test'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE)
        else:
            return Response(ProficiencyExamSerializer(prof_test).data, status=status.HTTP_200_OK)
