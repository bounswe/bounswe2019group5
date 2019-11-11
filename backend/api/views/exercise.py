from django.db.models import Q
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.exceptions import *
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect

from ..serializers import *
from ..models import *


class ResultView(mixins.CreateModelMixin,
                 GenericViewSet):

    serializer_class = ResultSerializer
    permission_classes = (IsAuthenticated,)

    def check_object_permissions(self, request, obj):
        if request.user.is_anonymous:
            raise NotAuthenticated('Token is needed')


class EssayView(GenericViewSet,
                mixins.CreateModelMixin,
                mixins.ListModelMixin,
                mixins.UpdateModelMixin,
                mixins.RetrieveModelMixin):

    def get_queryset(self):
        author = Q(author=self.request.user)
        reviewer = Q(reviewer=self.request.user)
        return Essay.objects.filter(author | reviewer)

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            return EssayCreateSerializer
        else:
            return EssaySerializer


def get_file(request):
    return redirect(request.path)
