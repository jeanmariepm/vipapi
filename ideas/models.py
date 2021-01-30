from django.db import models
from . import apps
from datetime import datetime

# Create your models here.

class Idea(models.Model):
  title = models.CharField(max_length=32)
  posted_date = models.DateField(default=datetime.now)
  posted_by = models.ForeignKey(apps.IdeasConfig.AUTH_USER_MODEL,
          on_delete=models.CASCADE, related_name='user_ideas')
  description = models.TextField(max_length=255)

  def __str__(self):
    return f'{self.title} {posted_by}'

class Comment(models.Model):
  idea = models.ForeignKey(Idea, 
          on_delete=models.CASCADE, related_name='idea_comments')
  commented_by = models.ForeignKey(apps.IdeasConfig.AUTH_USER_MODEL,
          on_delete=models.CASCADE, related_name='user_comments')
  commented_date = models.DateField(default=datetime.now)
  remark = models.TextField(max_length=255)

  def __str__(self):
    return f'{idea.title} {remark} {commented_by.username}'