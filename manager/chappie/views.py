from django.http import HttpResponse
from rest_framework import viewsets

from .models import Topic
from .serializers import TopicSerializer


def index(request):
    return HttpResponse("Visit <a href=/beheer/>/beheer/</a> or <a href=/api/>/api/</a> please.")


class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    lookup_field = "slug"
