from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.postgres.fields import JSONField


from .language import Language

languageChoices = [
    ('english', 'english'),
    ('turkish', 'turkish'),
    ('german', 'german')
]
levels = [
        ('A1', 'A1'),
        ('A2', 'A2'),
        ('B1', 'B1'),
        ('B2', 'B2'),
        ('C1', 'C1'),
        ('C2', 'C2'),
    ]


class User(AbstractUser):
    email = models.EmailField(unique=True)
    native_language = models.CharField(max_length=20, choices=languageChoices)

    rating_average = models.FloatField(default=0, blank=True)
    attended_languages = models.ManyToManyField(Language)

    levels = JSONField(default={'english': 'A1', 'turkish': 'A1', 'german': 'A1'})

    def __str__(self):
        return self.username
