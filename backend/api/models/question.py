from django.db import models

from ..models import Exam


class Question(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')
    answer = models.CharField(max_length=1000, default='')
    text = models.CharField(max_length=1000, default='')


class QuestionOption(models.Model):
    text = models.CharField(max_length=1000)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question_options')
