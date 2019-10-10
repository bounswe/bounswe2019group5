from rest_framework import generics
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
import numpy as np
import random 

from .models import User,Question
from .serializers import QuestionSerializer


class ProficiencyView(generics.CreateAPIView):


    def post(self, request):
        def get_random_questions(questionsNumber,questionLevel):
            setOfQuestion = Question.objects.filter(questionLevel=questionLevel)
            serializer = QuestionSerializer(setOfQuestion,many=True)
            setOfQuestion = serializer.data

            if len(setOfQuestion) < questionsNumber:
                return setOfQuestion
            else:
                return random.sample(setOfQuestion,questionsNumber)
        def get_prof_test():
            size = 1
            category = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
            questionList = np.array([get_random_questions(size, i) for i in category])
            questionList = np.reshape(questionList, (1, -1)).tolist()[0]

            #serializer = QuestionSerializer(questionList)

            return {
                "testQuestions": questionList,
            }
        
        permission_classes = (IsAuthenticated, )
        is_anonymous = request.user in User.objects.all()
        
        if not request.user.is_authenticated:
            return Response({'message': 'session expired'}, status=status.HTTP_401_UNAUTHORIZED)

        if not 'testLanguage' in request.data:
            return Response({'message':'language field must be exist'},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(get_prof_test(), status=status.HTTP_200_OK)


class LoginView(generics.CreateAPIView):

    def post(self, request):
        if 'email_username' in request.data and 'password' in request.data:
            user = User.objects.filter(
                username=request.data.get('email_username')).first()
            if not user:
                user = User.objects.filter(
                    email=request.data.get('email_username')).first()

            if not user:
                return Response(
                    {
                        'message': 'user not found'
                    },
                    status=status.HTTP_404_NOT_FOUND)
            else:
                if not user.check_password(request.data.get('password')):
                    return Response(
                        {
                            'message': 'password is wrong'
                        },
                        status=status.HTTP_401_UNAUTHORIZED)
                else:
                    token, created = Token.objects.get_or_create(user=user)
                    return Response(
                        {
                            'token': token.key
                        },
                        status=status.HTTP_202_ACCEPTED)

        else:
            return Response(
                {
                    'message': 'password is wrong'
                },
                status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.CreateAPIView):
    def post(self, request):
        req = request.data

        try:
            user = User(
                first_name=req['name'],
                last_name=req['surname'],
                username=req['username'],
                email=req['email'],
                nativeLanguage=req['native_language'])
            user.set_password(req['password'])
            user.save()

            token, created = Token.objects.get_or_create(user=user)

            response = {
                'token': token.key
            }

            return Response(response, status=status.HTTP_201_CREATED)
        except:
            response = {
                'message': 'invalid registration attempt'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class GuestView(generics.CreateAPIView):
    def post(self, request):
        permission_classes = (IsAuthenticated, )

        # check that registeredUser cannot request as a Guest
        if not request.user in User.objects.all():
            return Response({}, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)
