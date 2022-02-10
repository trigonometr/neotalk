from django.db import models
from django.contrib.auth.models import User
from replies.models import Reply


class Rate(models.Model):
    type = models.BooleanField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='rate_author')
    reply = models.ForeignKey(
        Reply, on_delete=models.CASCADE, related_name='rated_reply')
    creation_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} {"liked" if self.type else "disliked"} at {self.creation_time} reply {self.reply.id}'
