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
    re_path(r"^attributes/$", CsvAttributesListViewSet, name='attributes'),
    re_path(r"^counted_attributes/$", CountedAttributesListViewSet, name='counted_attributes'),
    re_path(r"^catalog_fields/$", CatalogFieldsListViewSet, name='catalog_fields'),
    re_path(r"^scoring_model/$", ScoringModelListViewSet, name='scoring_model'),
    re_path(r"^scoring_model/(?P<pk>[0-9]+)$", ScoringModelDetailViewSet, name='scoring_model_detail'),
    re_path(r"^counted_attributes/create_relation/$", CreateRelationScoreModelAndCountedAttributesViewSet, name="create_relation"),
]
