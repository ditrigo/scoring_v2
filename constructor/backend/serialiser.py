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