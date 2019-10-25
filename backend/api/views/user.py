from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from ..serializers import ProfileSerializer
from ..models import User


class RegisterView(generics.CreateAPIView):
    serializer_class = ProfileSerializer
    def create(self, request):
        req = request.data

        try:
            user = User(
                first_name=req['name'],
                last_name=req['surname'],
                username=req['username'],
                email=req['email'],
                native_lang=req['native_language'])
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


class LoginView(generics.CreateAPIView):
    serializer_class = ProfileSerializer
    def create(self, request):
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


class GuestView(generics.CreateAPIView):
    serializer_class = ProfileSerializer
    def create(self, request):
        permission_classes = (IsAuthenticated,)

        # check that registeredUser cannot request as a Guest
        if request.user not in User.objects.all():
            return Response({}, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    def retrieve(self, request):
        if request.user.is_anonymous:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)
        username = request.GET['username']
        user = User.objects.filter(username=username)
        if not user:
            return Response({}, status=status.HTTP_402_UNAUTHORIZED)
        user = user.first()
        return Response(ProfileSerializer(user).data, status=status.HTTP_200_OK)
