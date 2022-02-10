from django.db import models
from django.contrib.auth.models import User
from posts.models import Post


class Bookmark(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='bookmark_author')
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='bookmarked_post')
    creation_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Liked {self.post.id} at {self.creation_time} by {self.user.username}'
