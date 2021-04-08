import uuid
from django.db import models

class Topic(models.Model):
  class Flow(models.IntegerChoices):
    IMTR = 1
    OLO = 2
    REDIRECT_TO_OLO = 3

  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

  slug = models.CharField(max_length=40)
  name = models.CharField(max_length=80)
  heading = models.CharField(max_length=80, default='')
  url = models.CharField(max_length=200,  default='')
  intro = models.TextField()
  flow = models.IntegerField(choices=Flow.choices)

  def __str__(self):
    return self.name


class Permit(models.Model):
  name = models.CharField(max_length=120)
  imtr_url = models.CharField(max_length=200,  default='')
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  topic = models.ForeignKey(Topic, on_delete=models.CASCADE, default=None)
