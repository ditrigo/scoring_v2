from rest_framework import serializers
from .models import *

class FileAttributesSerialiser(serializers.ModelSerializer):
    class Meta:
        model = FileAttributes
        fields = "__all__"


class ImportedAttributesSerialiser(serializers.ModelSerializer):
    class Meta:
        model = ImportedAttributes
        fields = ["id", "created_date" , "author_id", "inn", "report_date"]
        # fields = "__all__"


class MainCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainCatalog
        fields = "__all__"


class MainCatalogFieldsSerializer(serializers.ModelSerializer):
    main_catalog_id = MainCatalogSerializer(many=False, read_only=True)
    class Meta:
        model = MainCatalogFields
        fields = "__all__"


class MarkersAttributesSerializer(serializers.ModelSerializer):
    # scoring_name = ScoringModelSerializer(many=True)
    class Meta:
        model = MarkersAttributes
        fields = "__all__"
        # exclude = ['author']


class InnResSerialiser(serializers.ModelSerializer):
    class Meta:
        model = InnRes
        fields = "__all__"


class ScoringModelSerializer(serializers.ModelSerializer):
    marker_id = MarkersAttributesSerializer(many=True, read_only=True)
    inns = InnResSerialiser(many=True, read_only=True)
    
    class Meta:
        model = ScoringModel
        fields = "__all__"
        # exclude = ['author']




# class CountedAttrFormulaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CountedAttrFormula
#         fields = "__all__"


### CRM VIEWS ###########################################################################################

#----------------
# СПРАВОЧНИКИ

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = "__all__"


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = "__all__"


class SupportMeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportMeasure
        fields = "__all__"


class ReviewStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewStage
        fields = "__all__"


class DebtTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DebtType
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ApplicantStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicantStatus
        fields = "__all__"


class InformationSourceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformationSourceType
        fields = "__all__"


class PositiveDecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PositiveDecision
        fields = "__all__"


class NegativeDecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NegativeDecision
        fields = "__all__"

#---------------------

#---------------------
# MAIN

class ClientRepresentativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientRepresentative
        fields = "__all__"


class InformationSourceSerializer(serializers.ModelSerializer):
    info_source_type_id = InformationSourceTypeSerializer(many=False, read_only=True)
    class Meta:
        model = InformationSource
        fields = "__all__"


class ComplianceCriteriaSerializer(serializers.ModelSerializer):
    debt_type = DebtTypeSerializer(many=False, read_only=True)
    category = CategorySerializer(many=False, read_only=True)
    support_measure = SupportMeasureSerializer(many=False, read_only=True)
    class Meta:
        model = ComplianceCriteria
        fields = "__all__"


class KPISerializer(serializers.ModelSerializer):
    positive_decision_type = PositiveDecisionSerializer(many=False, read_only=True)
    negative_decision_type = NegativeDecisionSerializer(many=False, read_only=True)
    class Meta:
        model = KPI
        fields = "__all__"


class FieldsOfPositiveDecisionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FieldsOfPositiveDecisions
        fields = "__all__"


class KpiPositiveDecisionFieldsSerializer(serializers.ModelSerializer):
    kpi = KPISerializer(many=True, read_only=True)
    fields_of_pos_decision = FieldsOfPositiveDecisionsSerializer(many=True, read_only=True)
    class Meta:
        model = KpiPositiveDecisionFields
        fields = "__all__"


class ClientSerializer(serializers.ModelSerializer):
    region = RegionSerializer(many=False, read_only=True)
    manager = ManagerSerializer(many=False, read_only=True)
    applicant_status = ApplicantStatusSerializer(many=False, read_only=True)
    information_source = InformationSourceSerializer(many=False, read_only=True)
    representitive_client = ClientRepresentativeSerializer(many=False, read_only=True)
    compliance_criteria = ComplianceCriteriaSerializer(many=False, read_only=True)
    kpi = KPISerializer(many=False, read_only=True)
    class Meta:
        model = Client
        fields = "__all__"

#---------------------