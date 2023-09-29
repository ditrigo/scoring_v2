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