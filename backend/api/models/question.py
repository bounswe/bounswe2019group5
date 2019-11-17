from django.db import models
from django.contrib.postgres.fields import ArrayField

from ..models import Exercise


class Question(models.Model):
    exam = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='questions')
    answer = models.CharField(max_length=1000, default='')
    options = ArrayField(models.CharField(max_length=100, blank=True),
                         size=5, default=list)
    body = models.TextField(max_length=10000000, default='')
