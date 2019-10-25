from django.db import models

from ..models import Exam


class Question(models.Model):
    levels = [
        ('A1', 'A1'),
        ('A2', 'A2'),
        ('B1', 'B1'),
        ('B2', 'B2'),
        ('C1', 'C1'),
        ('C2', 'C2'),
    ]
    types = [
        ('vocabulary', 'vocabulary'),
        ('grammar', 'grammar'),
        ('reading', 'reading'),
    ]
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')

    level = models.CharField(choices=levels, max_length=2)
    type = models.CharField(choices=types, max_length=10, default='vocabulary')
    answer = models.CharField(max_length=1000, default='')
    text = models.CharField(max_length=1000, default='')


class QuestionOption(models.Model):
    text = models.CharField(max_length=1000)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question_options')
