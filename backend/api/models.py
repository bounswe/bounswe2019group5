from django.db import models
from django.contrib.auth.models import AbstractUser

languageChoices = [
    ('english', 'english'),
    ('turkish', 'turkish'),
    ('german', 'german')
]


class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    nativeLanguage = models.CharField(max_length=20, choices=languageChoices)
    attendedLanguages = models.ManyToManyField(Language)

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)


class UserComment(models.Model):
    commented = models.ForeignKey(User, on_delete=models.CASCADE)
    commentor = models.CharField(max_length=20)
    comment = models.CharField(max_length=1000)
    rate = models.IntegerField(choices=range(0,5))

    def __str__(self):
        return self.comment

class Language(models.Model):
    language = models.CharField(choices=languageChoices)

    def __str__(self):
        return self.language


class Exam(models.Model):
    class Meta:
        abstract: True


class ProficiencyExam(Exam):
    language = models.CharField(max_length=20, choices=languageChoices)


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
