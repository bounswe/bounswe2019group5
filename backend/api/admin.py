from django.contrib import admin

from api.models.comment import Comment
from api.models.exam import ProficiencyExam
from api.models.language import Language
from api.models.question import QuestionOption, Question
from api.models.user import User

admin.site.register(User)
admin.site.register(Question)
admin.site.register(ProficiencyExam)
admin.site.register(QuestionOption)
admin.site.register(Language)
admin.site.register(Comment)
