from django.db import models

from .user import User


class Message(models.Model):
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='to_user')
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='from_user')
    date = models.DateTimeField(auto_now=True)
    text = models.CharField(max_length=1000)
