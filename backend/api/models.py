from django.db import models
from django.contrib.auth.models import User as UserBase


class User(UserBase):

    languageChoices = [
        ('english', 'english'),
        ('turkish', 'turkish'),
        ('german', 'german')
    ]

    nativeLanguage = models.CharField(max_length=20, choices=languageChoices)
