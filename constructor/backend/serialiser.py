from rest_framework import serializers
from .models import *

class FileAttributesSerialiser(serializers.ModelSerializer):
    class Meta:
        model = FileAttributes
        fields = ["id", "created_date", "filename"]


class CsvAttributesSerialiser(serializers.ModelSerializer):
    class Meta:
        model = CsvAttributes
        fields = ["id", "created_date" , "author_id", "inn", "report_date"]
        # fields = "__all__"


class MainCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainCatalog
        fields = "__all__"


class MainCatalogFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainCatalogFields
        fields = "__all__"


class ScoringModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoringModel
        fields = "__all__"
        # exclude = ['author']


class CountedAttributesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountedAttributes
        fields = "__all__"
        # exclude = ['author']

class InnResSerialiser(serializers.ModelSerializer):
    class Meta:
        model = InnRes
        fields = "__all__"

# class CountedAttrFormulaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CountedAttrFormula
#         fields = "__all__"