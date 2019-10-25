from django.db import models

languageChoices = [
    ('english', 'english'),
    ('turkish', 'turkish'),
    ('german', 'german')
]


class Language(models.Model):
    language = models.CharField(max_length=20, choices=languageChoices)

    def __str__(self):
        return self.language
