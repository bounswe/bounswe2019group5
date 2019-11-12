from django.db import models
from django.contrib.postgres.fields import ArrayField

from ..models import Exercise


class AbstractQuestion(models.Model):
    exam = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='questions')
    answer = models.CharField(max_length=1000, default='')
    options = ArrayField(models.CharField(max_length=100, blank=True),
                         size=5, default=list)


class Question(AbstractQuestion):
    body = models.CharField(max_length=1000, default='')


class ListeningQuestion(AbstractQuestion):
    body = models.FileField(upload_to='audio')
