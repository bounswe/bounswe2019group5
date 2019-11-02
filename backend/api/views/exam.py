import random

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from ..models import Exam
from ..serializers import ExerciseSerializer
from ..filters import ExamFilterSet


class ProficiencyView(mixins.ListModelMixin,
                      GenericViewSet):
    serializer_class = ExerciseSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ExamFilterSet

    def list(self, request, *args, **kwargs):
        def get_prof_test(language):
            proficiency_exams = Exam.objects.filter(language=language, type='proficiency')

            if not proficiency_exams:
                return []

            return random.sample(list(proficiency_exams), 1)[0]

        if request.user.is_anonymous:
            return Response({'message': 'session expired'}, status=status.HTTP_401_UNAUTHORIZED)

        prof_test = get_prof_test(request.query_params.get('language'))

        if not prof_test:
            return Response(
                {'message': 'database does not have enough questions for proficiency test'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE)
        else:
            return Response(ExerciseSerializer(prof_test).data, status=status.HTTP_200_OK)
