from django.urls import include, path

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
# router.register('users', views.UserViewSet)
# router.register('groups', views.GroupViewSet)
router.register('topics', views.TopicViewSet)
# router.register('permits', views.PermitViewSet)
# router.register('outcomes', views.PermitViewSet)


urlpatterns = [
    path('', views.index, name='index'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
