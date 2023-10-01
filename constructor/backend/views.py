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

class LogoutViewSet(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)