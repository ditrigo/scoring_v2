from django.shortcuts import render
from .models import *
from rest_framework import viewsets
from .serialiser import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

# Create your views here.
class FilesViewSet(viewsets.ModelViewSet):
    queryset = FileAttributes.objects.all()
    serializer_class = FileAttributesSerialiser


class CsvAttributesViewSet(viewsets.ModelViewSet):

    queryset = CsvAttributes.objects.all()
    serializer_class = CsvAttributesSerialiser

