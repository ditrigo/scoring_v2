from rest_framework import serializers
from .models import *

class FileAttributesSerialiser(serializers.ModelSerializer):
    class Meta:
        model = FileAttributes
        fields = ["id", "created_date", "filename"]


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
