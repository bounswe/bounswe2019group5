from django.contrib.auth.hashers import make_password
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import *
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated

from ..models import *
from ..serializers import *
from ..filters import UserFilterSet


class RegisterView(mixins.CreateModelMixin,
                   GenericViewSet):
    serializer_class = RegisterSerializer

    def create(self, request):
        req = request.data

        try:
            u = User(
                first_name=req['name'],
                last_name=req['surname'],
                username=req['username'],
                email=req['email'],
                native_language=req['native_language'],
                password=make_password(req['password']))

        except:
            response = {
                'message': 'required fields missing'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        try:
            u.save()
            token, _ = Token.objects.get_or_create(user=u)

            response = {
                'token': str(token.key)
            }
            return Response(response, status=status.HTTP_201_CREATED)

        except:
            response = {
                'message': 'invalid registration attempt'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class LoginView(mixins.CreateModelMixin,
                GenericViewSet):
    serializer_class = LoginSerializer

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


"""class GuestView(generics.CreateAPIView):
    serializer_class = ProfileSerializer

    def create(self, request):
        permission_classes = (IsAuthenticated,)

        # check that registeredUser cannot request as a Guest
        if request.user not in User.objects.all():
            return Response({}, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)"""


class ProfileView(mixins.ListModelMixin,
                  GenericViewSet):
    serializer_class = ProfileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilterSet

    def list(self, request, *args, **kwargs):
        if request.user.is_anonymous:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)
        username = request.query_params.get('username')
        user = User.objects.filter(username=username)
        if not user:
            return Response(ProfileSerializer(request.user).data, status=status.HTTP_200_OK)
        user = user.first()
        return Response(ProfileSerializer(user).data, status=status.HTTP_200_OK)


class RecommendationView(GenericViewSet,
                         mixins.CreateModelMixin,
                         mixins.ListModelMixin):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        if self.action == 'list':
            return User.objects.all()
        else:
            return Comment.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ProfileSerializer
        else:
            return CommentSerializer

    def create(self, request, *args, **kwargs):
        if request.user.is_anonymous:
            raise NotAuthenticated('Token is needed')

        commented_user = User.objects.get(username=self.request.data['username'])
        author = Q(author=self.request.user,
                   reviewer=commented_user,
                   status='accepted')

        reviewer = Q(reviewer=self.request.user,
                     author=commented_user,
                     status='accepted')

        approved_essays = Essay.objects.filter(author | reviewer)
        if len(approved_essays) == 0:
            raise PermissionDenied("You didn't send or accept an essay")

        previous = Comment.objects.filter(username=self.request.user.username,
                                          commented_user=commented_user)
        '''if len(previous) != 0:
            raise PermissionDenied('you cannot edit comment with post method')'''

        return super().create(request, *args, **kwargs)
