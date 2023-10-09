from rest_framework import serializers
from .models import Files

class FilesSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ["id", "filename"]