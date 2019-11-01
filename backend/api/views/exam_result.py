from rest_framework import mixins, status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from ..models import ProficiencyExam
from ..serializers.exam_result import ProficiencyExamResultSerializer


class ProficiencyResultView(mixins.CreateModelMixin,
                      GenericViewSet):
    serializer_class = ProficiencyExamResultSerializer

    def create(self, request):
        if ('exam_id' in request.data) and ('answers' in request.data):
            req = request.data
            answers = req['answers']

            for givenAnswer in answers:
                if ('answer' in givenAnswer) and ('question_id' in givenAnswer):
                    
                else:
                    return Response( { 'message': 'missing fields in request body'}, status=status.HTTP_400_BAD_REQUEST)
                        

        else:
            return Response(
                {
                    'message': 'missing fields in request body'
                },
                status=status.HTTP_400_BAD_REQUEST)
        return Response({'ok' : 'ito'}, status=status.HTTP_200_OK)
    
