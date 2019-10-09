from django.db import models
from django.contrib.auth.models import User as UserBase


class User(UserBase):

    languageChoices = [
        ('english', 'english'),
        ('turkish', 'turkish'),
        ('german', 'german')
    ]

    nativeLanguage = models.CharField(max_length=20, choices=languageChoices)
'''
class ListField(models.Field):

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 104
        super().__init__(*args, **kwargs)
'''
class Question(models.Model):
    levels = [
        ('A1','A1'),
        ('A2','A2'),
        ('B1','B1'),
        ('B2','B2'),
        ('C1','C1'),
        ('C2','C2'),
    ]
    questionTypes = [
        ('vocab','vocab'),
        ('grammar','grammar'),
        ('reading','reading'),
    ]
    index = [(i,i) for i in range(4)]

    questionLevel = models.CharField(choices=levels,max_length=2)
    questionType = models.CharField(choices=questionTypes,max_length=10)
    questionAnswer = models.IntegerField(choices=index)
    questionText = models.CharField(max_length=1000)
    #questionOptions = models.
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