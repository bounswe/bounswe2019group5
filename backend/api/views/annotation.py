from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.exceptions import *
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from ..serializers import *


class AnnotationView(GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.CreateModelMixin):
    permission_classes = (IsAuthenticated,)

    def check_object_permissions(self, request, obj):
        if request.user.is_anonymous:
            raise NotAuthenticated('Token is needed')

    def get_queryset(self):
        author = Q(source__author=self.request.user)
        reviewer = Q(source__reviewer=self.request.user)
        targets = AnnotationTarget.objects.filter(author | reviewer)

        return Annotation.objects.filter(id__in=targets.values('annotation'))

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return AnnotationCreateSerializer
        else:
            return AnnotationSerializer
