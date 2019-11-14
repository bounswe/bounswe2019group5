from django.db.models import Q, Sum
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.exceptions import *
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

from ..serializers import *
from ..models import *
from ..filters import ResultFilterSet


class ResultView(mixins.CreateModelMixin,
                 mixins.ListModelMixin,
                 GenericViewSet):

    serializer_class = ResultSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filterset_class = ResultFilterSet

    def get_queryset(self):
        return Result.objects.filter(user=self.request.user)

    def check_object_permissions(self, request, obj):
        if request.user.is_anonymous:
            raise NotAuthenticated('Token is needed')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.aggregate(number_of_true=Sum('number_of_true'), number_of_false=Sum('number_of_false'))
        return Response(queryset)


class EssayView(GenericViewSet,
                mixins.CreateModelMixin,
                mixins.ListModelMixin,
                mixins.UpdateModelMixin,
                mixins.RetrieveModelMixin,
                mixins.DestroyModelMixin):

    permission_classes = (IsAuthenticated,)

    def check_object_permissions(self, request, obj):
        if request.user.is_anonymous:
            raise NotAuthenticated('Token is needed')

        if 'PATCH' in str(self.request._request):

            if self.request.user == obj.author:
                if 'status' in self.request.data:
                    raise PermissionDenied('You are not reviewer for this essay')

            elif self.request.user == obj.reviewer:
                if 'status' not in self.request.data:
                    raise ParseError('status is needed')
                else:
                    if len(self.request.data) != 1:
                        raise PermissionDenied('You are not author for this essay')

            else:
                raise NotAuthenticated('You are not author or reviewer for this essay')

    def get_queryset(self):
        author = Q(author=self.request.user)
        reviewer = Q(reviewer=self.request.user)
        return Essay.objects.filter(author | reviewer)

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            return EssayCreateSerializer
        else:
            return EssaySerializer


class SuggestView(GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.RetrieveModelMixin):

    serializer_class = ExerciseSerializer
    permission_classes = (IsAuthenticated,)

    def check_object_permissions(self, request, obj):
        if request.user.is_anonymous:
            raise NotAuthenticated('Token is needed')

    def get_queryset(self):
        return Exercise.objects.filter(is_published=False)


def get_file(request):
    return redirect(request.path)
