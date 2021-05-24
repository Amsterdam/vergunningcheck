import uuid

from django.db import models
from sortedm2m.fields import SortedManyToManyField


class Permit(models.Model):
    flo_legal_id = models.CharField(
        max_length=30,
        primary_key=True,
        default="",
        editable=True,
        help_text="Dit is het id uit de url in de FloLegal STTR Builder. Bijvoorbeeld 'WKPxKx4YBJ5fqYSni' uit 'https://sttr-builder.flolegal.app/#/activiteit/WKPxKx4YBJ5fqYSni'",
    )
    name = models.CharField(max_length=120)
    # topic = models.ForeignKey(
    #     Topic, related_name="permits", on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Vergunning"
        verbose_name_plural = "Vergunningen"


class Topic(models.Model):
    flows = [
        ("IMTR", "IMTR"),
        ("OLO", "OLO"),
        ("REDIRECT_TO_OLO", "REDIRECT_TO_OLO"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    slug = models.CharField(max_length=40, unique=True)
    name = models.CharField(max_length=80)
    heading = models.CharField(max_length=80, default="")
    intro = models.TextField()
    flow = models.CharField(max_length=30, choices=flows)
    permits = SortedManyToManyField(Permit)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Checker"


class Outcome(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topic = models.ForeignKey(
        Topic, related_name="outcomes", on_delete=models.CASCADE, default=None
    )
    flo_legal_outcomes = models.CharField(
        max_length=100,
        help_text="Komma gescheiden veld met uitkomsten die moeten matchen. Sorteer alfabetisch op naam???",
    )
    text = models.TextField()

    def __str__(self):
        return f"{self.topic.name}: {self.flo_legal_outcomes}"

    class Meta:
        verbose_name = "Uitkomst"
        verbose_name_plural = "Uitkomsten"
