import random

from rest_framework import generics, status
from rest_framework.response import Response

from ..models import ProficiencyExam
from ..serializers import ProficiencyExamSerializer


class ProficiencyView(generics.RetrieveAPIView):
    serializer_class = ProficiencyExamSerializer

    def retrieve(self, request):
        def get_prof_test(language):
            proficiency_exams = ProficiencyExam.objects.filter(language=language)
            return random.sample(list(proficiency_exams), 1)[0]

        # permission_classes = (IsAuthenticated,)

        # if not request.user.is_authenticated:
        # return Response({'message': 'session expired'}, status=status.HTTP_401_UNAUTHORIZED)

        if 'language' not in request.GET:
            return Response({'message': 'language field must be exist'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            prof_test = get_prof_test(request.GET['language'])

            if not prof_test:
                return Response(
                    {'message': 'database does not have enough questions for proficiency test'},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE)
            else:
                return Response(ProficiencyExamSerializer(prof_test).data, status=status.HTTP_200_OK)
