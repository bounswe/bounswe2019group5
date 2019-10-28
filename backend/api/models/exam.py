from django.db import models

languageChoices = [
    ('english', 'english'),
    ('turkish', 'turkish'),
    ('german', 'german')
]


class Exam(models.Model):
    language = models.CharField(max_length=20, choices=languageChoices)

    class Meta:
        abstract: True


class ProficiencyExam(Exam):
    pass
