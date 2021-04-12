from django.contrib import admin
from django.db import models

from .models import Topic, Permit, Outcome
from pagedown.widgets import AdminPagedownWidget


class MyModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }

# @admin.register(Topic)


class TopicAdmin(MyModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }

    # listing
    # date_hierarchy = 'insert_time'
    list_display = ('slug', 'name', 'flow')
    # list_filter = ('active', )
    search_fields = ('name',)
    # detail page
    # exclude = ('id', 'insert_time', 'update_time', )


class PermitAdmin(MyModelAdmin):
    list_display = ('flo_legal_id', 'topic', 'name',)


class OutcomeAdmin(MyModelAdmin):
    pass
    # list_display = ('topic', 'flo_legal_outcomes',)


admin.site.register(Topic, TopicAdmin)
admin.site.register(Permit, PermitAdmin)
admin.site.register(Outcome, OutcomeAdmin)
