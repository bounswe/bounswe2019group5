from django.db import models
from django.contrib.auth.models import User as UserBase

languageChoices = [
    ('english', 'english'),
    ('turkish', 'turkish'),
    ('german', 'german')
]

class User(UserBase):

    nativeLanguage = models.CharField(max_length=20, choices=languageChoices)
'''
class ListField(models.Field):

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 104
        super().__init__(*args, **kwargs)
'''

class Exam(models.Model):
    class Meta:
        abstract: True

class ProficiencyExam(Exam):
    language =  models.CharField(max_length=20, choices=languageChoices)

class Question(models.Model):
    levels = [
        ('A1','A1'),
        ('A2','A2'),
        ('B1','B1'),
        ('B2','B2'),
        ('C1','C1'),
        ('C2','C2'),
    ]
    types = [
        ('vocabulary','vocabulary'),
        ('grammar','grammar'),
        ('reading','reading'),
    ]
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')

    level = models.CharField(choices=levels,max_length=2)
    type = models.CharField(choices=types,max_length=10, default='vocabulary')
    answer = models.CharField(max_length=1000, default='')
    text = models.CharField(max_length=1000,default='' )
    '''
    q = {
            "questionLevel": "A2",
            "questionType": "vocab",
            "questionId": "asd12ejd",
            "questionAnswer": "bring",
            "questionText": "to take or carry someone or \
                something to a place or a person, or \
                in the direction of the person speaking",
            "questionOptions": [
                "bring",
                "catch",
                "follow",
                "burn"
            ],
    }
    '''

class QuestionOption(models.Model):
    text = models.CharField(max_length=1000)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question_options')




