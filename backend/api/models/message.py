from django.db import models

from .user import User


class Message(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='to_user')
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name='from_user')
    date = models.DateTimeField(auto_now=True)
    text = models.CharField(max_length=1000)
