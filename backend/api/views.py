from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from rest_framework import status


from .models import User


class LoginView(APIView):

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


class RegisterView(APIView):
    def post(self, request):
        req = request.data

        try:
            user = User(
                first_name=req['name'],
                last_name=req['surname'],
                username=req['user_name'],
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


class GuestView(APIView):
    def post(self, request):
        permission_classes = (IsAuthenticated, )

        # check that registeredUser cannot request as a Guest
        if not request.user in User.objects.all():
            return Response({}, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)
