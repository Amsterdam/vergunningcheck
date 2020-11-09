from django.contrib import admin

from .models import Topic


# @admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    # listing
    # date_hierarchy = 'insert_time'
    # list_display = ('id', 'active', 'name', 'insert_time', 'update_time', )
    # list_filter = ('active', )
    search_fields = ('name',  )
    # detail page
    # exclude = ('id', 'insert_time', 'update_time', )

admin.site.register(Topic, TopicAdmin)
