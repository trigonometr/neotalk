from django.db import models
from django.contrib.auth.models import User
from posts.models import Post


class Reply(models.Model):
    text = models.TextField(max_length=1024)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='reply_author')
    reply_to = models.ForeignKey(
        'self', blank=True, null=True, on_delete=models.CASCADE, related_name='reply_to_user')
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    creation_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.text} at {self.creation_time} by {self.user.username}'
