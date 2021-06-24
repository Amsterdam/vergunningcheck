from django.urls import include, path

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('topics', views.TopicViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', include(router.urls)),

    # @TODO do we still need this?
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
