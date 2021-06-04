from django.contrib import admin
from django.db import models
from pagedown.widgets import AdminPagedownWidget

from .models import IMTRConfig, Outcome, Permit, Topic


class MyModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {"widget": AdminPagedownWidget},
    }


class TopicAdmin(MyModelAdmin):
    formfield_overrides = {
        models.TextField: {"widget": AdminPagedownWidget},
    }

    list_display = ("slug", "name", "flow")
    search_fields = ("name",)


class PermitAdmin(MyModelAdmin):
    list_display = (
        "flo_legal_id",
        "name",
    )


class OutcomeAdmin(MyModelAdmin):
    pass


class IMTRConfigAdmin(admin.ModelAdmin):
    pass


admin.site.register(IMTRConfig, IMTRConfigAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Permit, PermitAdmin)
admin.site.register(Outcome, OutcomeAdmin)

admin.site.site_header = "Chappie Manager"
