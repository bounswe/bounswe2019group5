from django.db import models

from .user import User


class Comment(models.Model):
    commented_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_comments')
    # username is username of the commentor
    username = models.CharField(max_length=20)
    comment = models.CharField(max_length=1000)
    rate = models.IntegerField(choices=[(i, i) for i in range(1, 6)])

    def __str__(self):
        return self.comment
