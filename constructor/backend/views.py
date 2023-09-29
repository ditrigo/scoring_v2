from django.shortcuts import render
from .models import *
from rest_framework import viewsets
from .serialiser import *

# Create your views here.
class FilesViewSet(viewsets.ModelViewSet):
    queryset = FileAttributes.objects.all()
    serializer_class = FileAttributesSerialiser

class CsvAttributesViewSet(viewsets.ModelViewSet):
    queryset = CsvAttributes.objects.all()
    serializer_class = CsvAttributesSerialiser