from rest_framework import serializers

from .models import IMTRConfig, Outcome, Permit, Topic


class IMTRConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = IMTRConfig
        exclude = []
        fields = ["blob"]


class PermitSerializer(serializers.HyperlinkedModelSerializer):
    imtr_config = IMTRConfigSerializer(read_only=True)

    class Meta:
        model = Permit
        fields = ["name", "imtr_config"]
        lookup_field = "flo_legal_id"
        extra_kwargs = {
            "url": {"lookup_field": "flo_legal_id"},
            "topic": {"lookup_field": "slug"},
        }


class OutcomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Outcome
        fields = [
            "flo_legal_outcomes",
            "text",
        ]


class TopicSerializer(serializers.HyperlinkedModelSerializer):
    permits = PermitSerializer(many=True, read_only=True)
    outcomes = OutcomeSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        exclude = []
        lookup_field = "slug"
        extra_kwargs = {
            "url": {"lookup_field": "slug"},
        }
