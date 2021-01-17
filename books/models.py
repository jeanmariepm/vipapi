from django.db import models
from . import apps
from datetime import datetime

# Create your models here.
class Genre(models.Model):
  name = models.CharField(max_length=32)

  def __str__(self):
    return self.name

class Book(models.Model):
  title = models.CharField(max_length=32)
  pub_date = models.DateField()
  genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

  def __str__(self):
    return self.title

class Review(models.Model):
  book = models.ForeignKey(Book, 
          on_delete=models.CASCADE, related_name='book_reviews')
  critic = models.ForeignKey(apps.BooksConfig.AUTH_USER_MODEL,
          on_delete=models.CASCADE, related_name='critic_reviews')
  rev_date = models.DateField(default=datetime.now)
  comment = models.TextField(max_length=255)

  def __str__(self):
    return f'{book.title} {comment} {critic.username}'