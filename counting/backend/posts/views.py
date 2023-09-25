from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Post
from .serializers import *

from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
