from django.db import models

class Permit(models.Model):
  name = models.CharField(max_length=120)
  imtr_url = models.CharField(max_length=200,  default='')

class Topic(models.Model):
  class Flow(models.IntegerChoices):
    IMTR = 1
    OLO = 2
    REDIRECT_TO_OLO = 3

  slug = models.CharField(max_length=40)
  name = models.CharField(max_length=80)
  url = models.CharField(max_length=200,  default='')
  intro = models.TextField()
  flow = models.IntegerField(choices=Flow.choices)
  permits = ...

  def __str__(self):
    return self.name

