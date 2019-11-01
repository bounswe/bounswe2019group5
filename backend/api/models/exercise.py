from django.db import models

from .user import User


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

    class Meta:
        Abstract: True


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


class UserExerciseRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_exercise_relation')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='user_exercise_relation')


class Result(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='result')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='result')
    number_of_true = models.IntegerField()
    number_of_false = models.IntegerField()

    class Meta:
        unique_together = ('user', 'exercise')
