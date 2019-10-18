from rest_framework import generics
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.core import serializers

from rest_framework import status
import numpy as np
import random

from .models import User, Question, ProficiencyExam, QuestionOption
from .serializers import ProficiencyExamSerializer, QuestionOptionSerializer, QuestionSerializer


class ProfileView(generics.CreateAPIView):

    def post(self, request):
        pass


class ProficiencyView(generics.CreateAPIView):

    def get(self, request):
        def get_prof_test(language):
            proficiency_exams = ProficiencyExam.objects.filter(language=language)
            return random.sample(list(proficiency_exams), 1)[0]

        # permission_classes = (IsAuthenticated,)

        # if not request.user.is_authenticated:
        # return Response({'message': 'session expired'}, status=status.HTTP_401_UNAUTHORIZED)

        if 'language' not in request.data:
            return Response({'message': 'language field must be exist'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            prof_test = get_prof_test(request.data['language'])

            if not prof_test:
                return Response(
                    {'message': 'database does not have enough questions for proficiency test'},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE)
            else:
                return Response(ProficiencyExamSerializer(prof_test).data, status=status.HTTP_200_OK)


class LoginView(generics.CreateAPIView):

    def post(self, request):
        if ('email_username' in request.data) and ('password' in request.data):
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
                    'message': 'missing fields in request body'
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
        permission_classes = (IsAuthenticated,)

        # check that registeredUser cannot request as a Guest
        if not request.user in User.objects.all():
            return Response({}, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)
