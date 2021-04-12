from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import TopicSerializer, PermitSerializer
from .models import Topic, Permit
from django.http import HttpResponse

from django.shortcuts import render


def index(request):
    return HttpResponse("Visit /beheer/ or /api/ please.")


class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    lookup_field = 'slug'
