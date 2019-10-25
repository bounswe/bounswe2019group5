from django.db import models
from django.contrib.auth.models import AbstractUser

from api.models.language import Language

languageChoices = [
    ('english', 'english'),
    ('turkish', 'turkish'),
    ('german', 'german')
]


class User(AbstractUser):
    email = models.EmailField(unique=True)
    native_lang = models.CharField(max_length=20, choices=languageChoices)
    rating_average = models.FloatField(default=0, blank=True)
    attended_langs = models.ManyToManyField(Language)

    def __str__(self):
        return self.username
