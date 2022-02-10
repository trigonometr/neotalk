from django.db import models
from django.contrib.auth.models import User

from neotalk.service import add_rate_to_replies, add_likes_to_posts


class Post(models.Model):
    category = models.CharField(max_length=32)
    text = models.TextField(max_length=1024)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.text} at {self.creation_time} by {self.user.username}'

    def add_likes(self):
        return add_likes_to_posts(self)

    def add_rate(self):
        return add_rate_to_replies(self.reply_set)
