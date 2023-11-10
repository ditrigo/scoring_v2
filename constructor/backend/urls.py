from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from .views import *



# router = DefaultRouter()
# router.register('files', FilesListViewSet, basename='files')
# router.register('attributes', CsvAttributesViewSet, basename='attributes')


urlpatterns = [
    # re_path('', include(router.urls)),
    ### Constructor URLS ####################################################################################
    re_path(r"^files/$", FilesListViewSet, name='files'),
    re_path(r"^attributes/$", ImportedAttributesListViewSet, name='attributes'),

    re_path(r"^marker_attributes/$", MarkersAttributesListViewSet, name='counted_attributes'),
    re_path(r"^marker_attributes/(?P<pk>[0-9]+)$", MarkersAttributesDetailViewSet, name='marker_detail'),

    re_path(r"^catalog_fields/$", CatalogFieldsListViewSet, name='catalog_fields'),
    re_path(r"^catalogs/$", CatalogsListViewSet, name='catalogs'),

    re_path(r"^scoring_model/$", ScoringModelListViewSet, name='scoring_model'),
    re_path(r"^scoring_model/(?P<pk>[0-9]+)$", ScoringModelDetailViewSet, name='scoring_model_detail'),

    re_path(r"^marker_attributes/create_relation/$", CreateRelationScoreModelAndMarkersAttributesViewSet, name="create_relation_cntd_attr_score_mdl"),
    re_path(r"^inn_res/create_relation/$", CreateRelationInnAndScoringModelViewSet, name="create_relation_inn_score_mdl"),
    
    re_path(r"^inn_res/$", InnAndResultsListViewSet, name="inn_and_results"),
    re_path(r"^inn_res/(?P<pk>[0-9]+)$", InnAndResultsDetailViewSet, name="inn_and_results_detail"),

    re_path(r"^start_scoring/$", StartScoringViewSet, name="start_scoring"),
    # re_path(r"^start_2scoring/$", StartScoring2ViewSet, name="start_2scoring"),
    re_path(r"^start_test_scoring/$", StartTestScoringViewSet, name="start_test_scoring"),
    # re_path(r"^get_formula_value/$", GetformulaValue, name="get_formula_value"), # тестовая апишка

    re_path(r"^download/$", DownloadTryViewSet, name="download"),


    ### CRM URLS ###########################################################################################
    #----------------
    # СПРАВОЧНИКИ
    re_path(r"^crm_managers/$", ManagerViewSet, name="crm_managers"),
    re_path(r"^crm_region/$", RegionViewSet, name="crm_region"),
    re_path(r"^crm_supp_measure/$", SupportMeasureViewSet, name="crm_supp_measure"),
    re_path(r"^crm_review_stage/$", ReviewStageViewSet, name="crm_review_stage"),
    re_path(r"^crm_dept_type/$", DebtTypeViewSet, name="crm_dept_type"),
    re_path(r"^crm_category/$", CategoryViewSet, name="crm_category"),
    re_path(r"^crm_applicant_status/$", ApplicantStatusViewSet, name="crm_applicant_status"),
    re_path(r"^crm_info_source_type/$", InformationSourceTypeViewSet, name="crm_info_source_type"),
    re_path(r"^crm_pos_decision/$", PositiveDecisionViewSet, name="crm_pos_decision"),
    re_path(r"^crm_neg_decision/$", NegativeDecisionViewSet, name="crm_neg_decision"),
    re_path(r"^crm_fields_of_positiv_decision/(?P<pk>[-\w]+)$", FieldsOfPositiveDecisionsViewSet, name="crm_fields_of_positiv_decision"),
    #----------------

    #---------------------
    # MAIN

    re_path(r"^crm_client/$", ClientViewSet, name="crm_client"),
    re_path(r"^crm_create_client/$", CreateRelationClient, name="crm_create_client"),
    re_path(r"^crm_detail_relation_client/(?P<pk>[-\w]+)$", DetailRelationClient, name="crm_detail_relation_client"),
    re_path(r"^crm_update_relation_client/(?P<pk>[-\w]+)$", UpdateRelationClient, name="crm_update_relation_client"),
    #---------------------
]
