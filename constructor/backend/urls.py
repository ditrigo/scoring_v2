from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from .views import *



# router = DefaultRouter()
# router.register('files', FilesListViewSet, basename='files')
# router.register('attributes', CsvAttributesViewSet, basename='attributes')


urlpatterns = [
    # re_path('', include(router.urls)),
    re_path(r"^files/$", FilesListViewSet, name='files'),
    # re_path(r"^attributes/$", CsvAttributesListViewSet, name='attributes'),
    re_path(r"^counted_attr/$", CountedAttributesListViewSet, name='attributes'),
    re_path(r"^import_attributes/$", CsvAttributesListViewSet, name='attributes'),
]
