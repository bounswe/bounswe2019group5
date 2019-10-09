from django.contrib import admin
from .models import User, Question


admin.site.register(User)
admin.site.register(Question)

