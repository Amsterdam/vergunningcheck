from django.contrib import admin
from django.db import models

from .models import Topic, Permit, Outcome
from pagedown.widgets import AdminPagedownWidget


class MyModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }


class TopicAdmin(MyModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }

    list_display = ('slug', 'name', 'flow')
    search_fields = ('name',)


class PermitAdmin(MyModelAdmin):
    list_display = ('flo_legal_id', 'topic', 'name',)


class OutcomeAdmin(MyModelAdmin):
    pass


admin.site.register(Topic, TopicAdmin)
admin.site.register(Permit, PermitAdmin)
admin.site.register(Outcome, OutcomeAdmin)

admin.site.site_header = 'Chappie Manager'
