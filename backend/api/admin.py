from django.contrib import admin

from .models import *

admin.site.register(User)

admin.site.register(Exercise)
admin.site.register(Result)
admin.site.register(Question)
admin.site.register(File)

admin.site.register(Essay)


admin.site.register(Language)
admin.site.register(Comment)
admin.site.register(Message)
