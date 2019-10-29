from django.db import models


class Exam(models.Model):
    languageChoices = [
        ('english', 'english'),
        ('turkish', 'turkish'),
        ('german', 'german')
    ]
    types = [
        ('vocabulary', 'vocabulary'),
        ('grammar', 'grammar'),
        ('reading', 'reading'),
        ('proficiency', 'proficiency'),
    ]
    type = models.CharField(choices=types, max_length=11, default='vocabulary')
    language = models.CharField(max_length=20, choices=languageChoices)


class Exercise(Exam):
    levels = [
        ('A1', 'A1'),
        ('A2', 'A2'),
        ('B1', 'B1'),
        ('B2', 'B2'),
        ('C1', 'C1'),
        ('C2', 'C2'),
    ]
    level = models.CharField(choices=levels, max_length=2)
