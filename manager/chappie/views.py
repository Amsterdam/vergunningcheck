from django.http import HttpResponse
from rest_framework import viewsets

from .models import Topic
from .serializers import TopicSerializer


def index():
    return HttpResponse("Visit /beheer/ or /api/ please.")


class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    lookup_field = "slug"
