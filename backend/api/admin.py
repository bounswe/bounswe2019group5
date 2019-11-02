from django.contrib import admin

from .models import *

admin.site.register(User)

admin.site.register(Result)
admin.site.register(UserExerciseRelation)

admin.site.register(Exercise)
admin.site.register(Question)
admin.site.register(QuestionOption)


admin.site.register(Language)

admin.site.register(Comment)

