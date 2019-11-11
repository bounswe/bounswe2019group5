from django.contrib import admin

from .models import *

admin.site.register(User)

admin.site.register(Exercise)
admin.site.register(Result)
admin.site.register(Question)
admin.site.register(QuestionOption)

admin.site.register(Essay)
admin.site.register(ListeningExercise)

admin.site.register(Language)
admin.site.register(Comment)
admin.site.register(Message)
