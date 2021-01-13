from django.db import models

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
