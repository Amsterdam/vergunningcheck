from django.contrib import admin
from django.db import models
from pagedown.widgets import AdminPagedownWidget

from .models import IMTRConfig, Outcome, Permit, PreQuestion, Topic


class MyModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {"widget": AdminPagedownWidget},
    }


class TopicAdmin(MyModelAdmin):
    formfield_overrides = {
        models.TextField: {"widget": AdminPagedownWidget},
    }
    list_display = ("name", "slug", "flow", "permit_count")
    search_fields = (
        "name",
        "slug",
    )
    list_filter = ("flow",)
    ordering = ("name",)

    def permit_count(self, obj):
        return obj.permits.count()

    permit_count.short_description = "# vergunningen"


class PermitAdmin(MyModelAdmin):
    list_display = ("name", "flo_legal_id", "config_id", "checker_name")
    search_fields = (
        "name",
        "flo_legal_id",
    )
    readonly_fields = ("imtr_config",)
    ordering = ("name",)

    def config_id(self, obj):
        return obj.imtr_config.id

    def checker_name(self, obj):
        return Topic.objects.get(permits__in=[obj]).name

    checker_name.short_description = "Checker"


class OutcomeAdmin(MyModelAdmin):
    list_display = (
        "flo_legal_outcomes",
        "topic",
    )
    list_filter = ("topic",)
    ordering = ("-topic",)


class IMTRConfigAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "version",
        "config_permit",
        "created",
    )


class PreQuestionAdmin(admin.ModelAdmin):
    list_display = (
        "key",
        "description",
    )


admin.site.register(IMTRConfig, IMTRConfigAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Permit, PermitAdmin)
admin.site.register(Outcome, OutcomeAdmin)
admin.site.register(PreQuestion, PreQuestionAdmin)

admin.site.site_header = "Chappie Manager"
