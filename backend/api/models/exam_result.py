from django.db import models
from .user import User
from .exam import Exam

levels = [
        ('A1', 'A1'),
        ('A2', 'A2'),
        ('B1', 'B1'),
        ('B2', 'B2'),
        ('C1', 'C1'),
        ('C2', 'C2'),
]

class ExamResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='exam_results')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='results')

    class Meta:
        abstract: True


class ProficiencyExamResult(ExamResult):
    level = models.CharField(choices=levels, max_length=2)
    
