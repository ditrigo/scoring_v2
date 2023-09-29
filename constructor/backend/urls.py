from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('files', FilesViewSet, basename='files')
router.register('attributes', CsvAttributesViewSet, basename='attributes')


urlpatterns = [
    re_path('', include(router.urls)),
]
