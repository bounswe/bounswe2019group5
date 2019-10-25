from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Question)
admin.site.register(ProficiencyExam)
admin.site.register(QuestionOption)
admin.site.register(Language)
admin.site.register(Comment)
