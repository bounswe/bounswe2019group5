from django.contrib import admin

from .models import Comment, User, ProficiencyExam, Language, QuestionOption, Question

admin.site.register(User)
admin.site.register(Question)
admin.site.register(ProficiencyExam)
admin.site.register(QuestionOption)
admin.site.register(Language)
admin.site.register(Comment)
