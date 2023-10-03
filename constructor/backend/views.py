from django.urls import reverse
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from import_export.formats.base_formats import CSV, XLSX
from import_export.results import Result, RowResult
from .serialiser import *
from .models import *
from .admin import *
from tablib import Dataset
from .exceptions import ExportError, ImportError

EXPORT_FORMATS_DICT = {
    "csv": CSV.CONTENT_TYPE,
    "xlsx": XLSX.CONTENT_TYPE,
}
IMPORT_FORMATS_DICT = EXPORT_FORMATS_DICT

# Uploaded files into DataBase
@api_view(['GET', 'POST'])
def FilesListViewSet(request):#(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        files = FileAttributes.objects.all().order_by('id')
        page = request.GET.get('page', 1)
        paginator = Paginator(files, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = FileAttributesSerialiser(data,context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 
                         'count': paginator.count, 
                         'numpages' : paginator.num_pages, 
                         'nextlink': '/api/files/?page=' + str(nextPage), 
                         'prevlink': '/api/files/?page=' + str(previousPage)})
    elif request.method == 'POST':
        serializer = FileAttributesSerialiser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
def CsvAttributesListViewSet(request):#(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        attributes = CsvAttributes.objects.all().order_by('id')
        page = request.GET.get('page', 1)
        paginator = Paginator(attributes, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CsvAttributesSerialiser(data,context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 
                         'count': paginator.count, 
                         'numpages' : paginator.num_pages, 
                         'nextlink': '/api/attributes/?page=' + str(nextPage), 
                         'prevlink': '/api/attributes/?page=' + str(previousPage)})
    elif request.method == 'POST':
        filename = request.FILES["filename"]
        extension = filename.name.split(".")[-1].lower()
        dataset = Dataset()
        
        csv_resource = CsvAttributesResource()

        if extension in IMPORT_FORMATS_DICT:
            dataset.load(filename.read(), format=extension)
        else:
            raise ImportError("Unsupport import format", code="unsupport_import_format")

        result = csv_resource.import_data(
            dataset,
            dry_run= False,
            collect_failed_rows=True,
            skip_unchanged = True,
            report_skipped = False,
            raise_errors=True,
        )

        if not result.has_validation_errors() or result.has_errors():
            result = csv_resource.import_data(
                dataset, 
                dry_run=True,
                skip_unchanged = True, 
                report_skipped = False,
                raise_errors=True,
            )
        else:
            raise ImportError("Import data failed", code="import_data_failed")
        #TODO Сделать репорт о пропущенных строках!
        return Response(
            data={"message": "Import successed",}, status=status.HTTP_201_CREATED
        )

        # serializer = CsvAttributesSerialiser(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class CsvAttributesViewSet(viewsets.ModelViewSet):

#     queryset = CsvAttributes.objects.all()
#     serializer_class = CsvAttributesSerialiser


@api_view(['GET', 'POST'])
def CountedAttributesListViewSet(request):
    permission_classes = (IsAuthenticated,)
    data = None
    paginator = None
    serializer = CountedAttributesSerializer()
    next_page = None
    previous_page = None
    
    if request.method == 'GET':
        attributes = CountedAttributes.objects.all().order_by('id')
        paginator = Paginator(attributes, 10)
        page = request.GET.get('page', 1)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)
        
        serializer = CountedAttributesSerializer(data, context={'request': request}, many=True)
        next_page = paginator.next_page_number() if data.has_next() else None
        previous_page = paginator.previous_page_number() if data.has_previous() else None
        
        return Response({
            'data': serializer.data,
            'count': paginator.count,
            'numpages': paginator.num_pages,
            'nextlink': '/api/counted_attr/?page=' + str(next_page), 
            'prevlink': '/api/counted_attr/?page=' + str(previous_page)
        })
    
    elif request.method == 'POST':
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

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