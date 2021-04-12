from django.contrib.auth.models import User, Group
from .models import Topic, Permit, Outcome
from rest_framework import serializers


class PermitSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Permit
        fields = ['flo_legal_id', 'name']
        lookup_field = "flo_legal_id"
        extra_kwargs = {
            'url': {'lookup_field': 'flo_legal_id'},
            'topic': {'lookup_field': 'slug'}
        }


class OutcomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Outcome
        fields = ['flo_legal_outcomes', 'text', ]


class TopicSerializer(serializers.HyperlinkedModelSerializer):
    permits = PermitSerializer(many=True, read_only=True)
    outcomes = OutcomeSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        exclude = []
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'},
        }
