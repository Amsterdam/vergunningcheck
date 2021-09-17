import uuid

from django.db import models
from django.utils import timezone
from sortedm2m.fields import SortedManyToManyField


class IMTRConfig(models.Model):
    created = models.DateTimeField(default=timezone.now)
    config_permit = models.ForeignKey(
        "Permit", on_delete=models.PROTECT, null=True, blank=True
    )
    version = models.IntegerField()
    blob = models.TextField()

    def __str__(self):
        return f"{self.config_permit.name} (v{self.version})"

    class Meta:
        verbose_name = "IMTR configuratie"
        verbose_name_plural = "IMTR configuraties"


class Permit(models.Model):
    flo_legal_id = models.CharField(
        max_length=30,
        primary_key=True,
        default="",
        editable=True,
        help_text="Dit is het id uit de url in de FloLegal STTR Builder. Bijvoorbeeld 'WKPxKx4YBJ5fqYSni' uit 'https://sttr-builder.flolegal.app/#/activiteit/WKPxKx4YBJ5fqYSni'",
    )
    name = models.CharField(max_length=120)
    imtr_config = models.ForeignKey(
        IMTRConfig, on_delete=models.CASCADE, default=None, blank=True, null=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Vergunning"
        verbose_name_plural = "Vergunningen"


class PreQuestion(models.Model):
    key = models.CharField(max_length=40, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.key

    class Meta:
        verbose_name = "Vraag vooraf"
        verbose_name_plural = "Vragen vooraf"


class Topic(models.Model):
    flows = [
        ("IMTR", "IMTR"),
        ("OLO", "OLO"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    slug = models.CharField(max_length=60, unique=True)
    name = models.CharField(max_length=80)
    flow = models.CharField(max_length=20, choices=flows)
    heading = models.CharField(max_length=80, default="")
    intro = models.TextField()
    user_might_not_need_permit = models.BooleanField(
        default=True,
        help_text="Enables an add-on text in the QuestionAlert: 'If you make another choice you might not need a permit.'",
    )
    pre_questions = models.ManyToManyField(
        PreQuestion, default=None, blank=True, null=True
    )
    permits = SortedManyToManyField(Permit)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Vergunningcheck"
        verbose_name_plural = "Vergunningchecks"


class Outcome(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topic = models.ForeignKey(
        Topic,
        related_name="outcomes",
        on_delete=models.CASCADE,
        default=None,
        verbose_name="Checker",
    )
    flo_legal_outcomes = models.CharField(
        max_length=100,
        help_text="Komma gescheiden veld met uitkomsten die moeten matchen. Sorteer alfabetisch op naam???",
    )
    text = models.TextField(blank=True, null=True, default=None)

    def __str__(self):
        return self.flo_legal_outcomes

    class Meta:
        verbose_name = "Uitkomst"
        verbose_name_plural = "Uitkomsten"
