from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import FilesViewSet

router = DefaultRouter()
router.register('files', FilesViewSet, basename='files')

urlpatterns = [
    path('api/', include(router.urls)),
]
