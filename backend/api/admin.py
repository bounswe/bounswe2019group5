from django.contrib import admin
from .models import User, Question, ProficiencyExam, QuestionOption


admin.site.register(User)
admin.site.register(Question)
admin.site.register(ProficiencyExam)
admin.site.register(QuestionOption)

