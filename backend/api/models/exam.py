from django.db import models

languageChoices = [
    ('english', 'english'),
    ('turkish', 'turkish'),
    ('german', 'german')
]


class Exam(models.Model):
    class Meta:
        abstract: True


class ProficiencyExam(Exam):
    language = models.CharField(max_length=20, choices=languageChoices)
