import datetime
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
import json
from django.http import JsonResponse


# Uploaded files into DataBase
@api_view(['GET', 'POST'])
def FilesListViewSet(request):  # (viewsets.ModelViewSet):
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

        serializer = FileAttributesSerialiser(
            data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                         'count': paginator.count,
                         'numpages': paginator.num_pages,
                         'nextlink': '/api/files/?page=' + str(nextPage),
                         'prevlink': '/api/files/?page=' + str(previousPage)})
    elif request.method == 'POST':
        serializer = FileAttributesSerialiser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def InsertValuesToCountedAttributes():

    def calculate_counted_attributes(csv_attributes):
        attr_131 = csv_attributes.s_1150_4 - csv_attributes.pru_cad_cost_amt - csv_attributes.lru_cad_cost_amt - csv_attributes.lru_cad_cost_amt_6monthago if csv_attributes.s_1150_4 - \
            csv_attributes.pru_cad_cost_amt - csv_attributes.lru_cad_cost_amt - csv_attributes.lru_cad_cost_amt_6monthago > 0 else 0
        attr_132 = csv_attributes.s_1500_4 - \
            csv_attributes.s_1530_4 if csv_attributes.s_1500_4 - \
            csv_attributes.s_1530_4 != 0 else 0
        attr_133 = csv_attributes.s_1200_4 / \
            (csv_attributes.s_1500_4 + csv_attributes.s_1400_4) if csv_attributes.s_1500_4 + \
            csv_attributes.s_1400_4 != 0 else 0
        attr_134 = csv_attributes.s_1300_4 / \
            csv_attributes.s_1600_4 if csv_attributes.s_1600_4 != 0 else 0
        attr_135 = csv_attributes.s_2400_4 / \
            csv_attributes.s_2330_4 if csv_attributes.s_2330_4 != 0 else 0
        attr_136 = csv_attributes.s_2400_4 / \
            csv_attributes.s_1600_4 if csv_attributes.s_1600_4 != 0 else 0
        attr_137 = csv_attributes.dolg / \
            csv_attributes.s_1600_4 if csv_attributes.s_1600_4 != 0 else 0
        attr_138 = csv_attributes.s_2400_4 / ((csv_attributes.s_1300_4 + csv_attributes.s_1300_5) / 2) * \
            100 if csv_attributes.s_1300_4 + csv_attributes.s_1300_5 != 0 else 0
        attr_139 = (csv_attributes.s_1500_4 + csv_attributes.s_1400_4) / \
            csv_attributes.s_1300_4 if csv_attributes.s_1300_4 != 0 else 0
        attr_140 = (csv_attributes.s_1410_4 + csv_attributes.s_1510_4 - csv_attributes.s_1240_4 - csv_attributes.s_1250_4) / (csv_attributes.s_2110_4 - csv_attributes.s_2120_4 - csv_attributes.s_2210_4 - csv_attributes.s_2220_4 + csv_attributes.s_2310_4 + csv_attributes.s_2320_4 +
                                                                                                                              csv_attributes.s_2340_4 - csv_attributes.s_2350_4) if (csv_attributes.s_2110_4 - csv_attributes.s_2120_4 - csv_attributes.s_2210_4 - csv_attributes.s_2220_4 + csv_attributes.s_2310_4 + csv_attributes.s_2320_4 + csv_attributes.s_2340_4 - csv_attributes.s_2350_4) != 0 else 0
        attr_141 = csv_attributes.s_2110_4 / \
            ((csv_attributes.s_1600_4 + csv_attributes.s_1600_5) /
             2) if csv_attributes.s_1600_4 + csv_attributes.s_1600_5 != 0 else 0
        attr_142 = (csv_attributes.s_1520_4 + csv_attributes.s_1520_5) / (csv_attributes.s_1230_4 +
                                                                          csv_attributes.s_1230_5) if csv_attributes.s_1230_4 + csv_attributes.s_1230_5 != 0 else 0
        attr_143 = (csv_attributes.account_balance_SKUAD + csv_attributes.pru_cad_cost_amt + csv_attributes.lru_cad_cost_amt - csv_attributes.cad_cost_amt_inpledge +
                    csv_attributes.s_1230_4 * 0.0861 + csv_attributes.ts_cad_cost_amt + csv_attributes.attr_131) / (csv_attributes.s_1520_4 * 1.069) if csv_attributes.s_1520_4 != 0 else 0
        attr_144 = (csv_attributes.s_1300_4 + csv_attributes.s_1400_4) / \
            csv_attributes.s_1600_4 if csv_attributes.s_1600_4 != 0 else 0
        attr_145 = (csv_attributes.s_1300_4 - csv_attributes.s_1100_4) / \
            csv_attributes.s_1200_4 if csv_attributes.s_1200_4 != 0 else 0
        attr_146 = (csv_attributes.s_1300_4 - csv_attributes.s_1100_4) / \
            csv_attributes.s_1210_4 if csv_attributes.s_1210_4 != 0 else 0
        attr_147 = (csv_attributes.s_1230_4 + csv_attributes.s_1240_4 + csv_attributes.s_1250_4) / \
            csv_attributes.s_1210_4 if csv_attributes.s_1500_4 != 0 else 0
        attr_148 = csv_attributes.s_1600_4 - csv_attributes.s_1600_5
        attr_149 = csv_attributes.s_1600_5 - csv_attributes.s_1600_4_2yearago
        attr_150 = csv_attributes.s_1600_4_2yearago - csv_attributes.s_1600_5_2yearago
        attr_151 = csv_attributes.s_2400_4 - csv_attributes.s_2400_5
        attr_152 = csv_attributes.s_2400_5 - csv_attributes.s_2400_4
        attr_153 = csv_attributes.s_2400_4 - csv_attributes.s_2400_5_2yearago
        attr_154 = csv_attributes.s_1200_4 / \
            csv_attributes.s_1500_4 if csv_attributes.s_1500_4 != 0 else 0
        attr_155 = csv_attributes.s_1300_4 / (csv_attributes.s_1510_4 + csv_attributes.s_1400_4 + csv_attributes.s_1550_4 +
                                              csv_attributes.s_1520_4) if csv_attributes.s_1510_4 + csv_attributes.s_1400_4 + csv_attributes.s_1550_4 + csv_attributes.s_1520_4 != 0 else 0
        attr_156 = (csv_attributes.s_2400_4 + csv_attributes.s_2330_4 + csv_attributes.s_2410_4) / \
            csv_attributes.s_2330_4 if csv_attributes.s_2330_4 != 0 else 0
        attr_157 = csv_attributes.s_2200_4 / \
            csv_attributes.s_1100_4 if csv_attributes.s_1100_4 != 0 else 0
        attr_158 = csv_attributes.s_1300_4 / \
            csv_attributes.s_1600_4 if csv_attributes.s_1600_4 != 0 else 0
        attr_159 = (csv_attributes.s_1400_4 + csv_attributes.s_1500_4) / \
            csv_attributes.s_1300_4 if csv_attributes.s_1300_4 != 0 else 0
        attr_160 = csv_attributes.pru_cad_cost_amt + \
            csv_attributes.lru_cad_cost_amt + csv_attributes.ts_cad_cost_amt
        attr_161 = (csv_attributes.enforce_ntfinish_sum_wthtax + csv_attributes.dolg) * \
            100 / csv_attributes.s_1520_4 - 100 if csv_attributes.s_1520_4 != 0 else 0
        attr_162 = csv_attributes.s_1210_4 * 100 / csv_attributes.s_1150_4 - \
            100 if csv_attributes.s_1150_4 != 0 else 0
        attr_163 = (csv_attributes.npo_2_010_year + csv_attributes.npo_4_010 + csv_attributes.npo_5_060) * \
            100 / csv_attributes.s_2110_4 - 100 if csv_attributes.s_2110_4 != 0 else 0
        attr_164 = 100 if (csv_attributes.s_1510_4 + csv_attributes.s_1410_4) == 0 and csv_attributes.cad_cost_amt_inpledge > 0 else (
            csv_attributes.cad_cost_amt_inpledge * 100 / (csv_attributes.s_1510_4 + csv_attributes.s_1410_4) - 100)
        attr_165 = 100 if csv_attributes.npo_2_020_thisyear > 0 and csv_attributes.npo_2_020_lastyear != 0 else (
            (csv_attributes.npo_2_020_thisyear - csv_attributes.npo_2_020_lastyear) * 100 / csv_attributes.npo_2_020_lastyear - 100) if csv_attributes.npo_2_020_lastyear != 0 else 0
        attr_166 = (csv_attributes.account_balance_SKUAD + csv_attributes.npo_2_020_year0 + csv_attributes.s_1230_4 * 0.0861 + csv_attributes.attr_131 + csv_attributes.s_1210_4 +
                    csv_attributes.npo_2_060_year + csv_attributes.stcontract_amount - csv_attributes.dolg - csv_attributes.razryv_1stlink_sum - csv_attributes.enforce_ntfinish_sum_wthtax) / 1000000
        attr_167 = ((csv_attributes.pru_cad_cost_amt + csv_attributes.lru_cad_cost_amt + csv_attributes.ts_cad_cost_amt)
                    * 0.2 + csv_attributes.s_1230_4 * 0.0861 + csv_attributes.attr_131 * 0.2) / 1000000
        attr_168 = ((csv_attributes.account_balance_SKUAD + (csv_attributes.pru_cad_cost_amt + csv_attributes.lru_cad_cost_amt + csv_attributes.ts_cad_cost_amt) * 0.2 + csv_attributes.s_1230_4 * 0.0861 +
                    csv_attributes.attr_131 * 0.2) * 100) / (csv_attributes.s_1500_4 + csv_attributes.s_1400_4 + csv_attributes.dolg) if (csv_attributes.s_1500_4 + csv_attributes.s_1400_4 + csv_attributes.dolg) != 0 else 0
        attr_169 = ((csv_attributes.s_1300_5 / csv_attributes.s_1300_4) / 1000000 - csv_attributes.s_1300_4 / 1000000) if csv_attributes.s_1300_4 != 0 and (
            (csv_attributes.s_1300_5 / csv_attributes.s_1300_4) < 0 or (csv_attributes.s_1300_5 / csv_attributes.s_1300_4) > 3) else 0
        attr_170 = ((csv_attributes.s_1410_4 / csv_attributes.s_1300_4) / 1000000 - csv_attributes.s_1300_4 / 1000000) if csv_attributes.s_1300_4 != 0 and (
            (csv_attributes.s_1410_4 / csv_attributes.s_1300_4) < 0 or (csv_attributes.s_1410_4 / csv_attributes.s_1300_4) > 3) else 0
        attr_171 = csv_attributes.npo_2_010_year + csv_attributes.npo_2_020_year - \
            csv_attributes.npo_2_030_year - csv_attributes.npo_2_040_year
        attr_172 = csv_attributes.s_1520_4 + \
            csv_attributes.s_1450_4 + csv_attributes.s_1550_4
        attr_173 = csv_attributes.s_1410_4 + csv_attributes.s_1450_4 + \
            csv_attributes.s_1510_4 + csv_attributes.s_1520_4
        attr_174 = (csv_attributes.account_balance_SKUAD + csv_attributes.npo_2_020_year0 + csv_attributes.s_1230_4 * 0.0861 + csv_attributes.attr_131 + csv_attributes.s_1210_4 +
                    csv_attributes.npo_2_060_year + csv_attributes.stcontract_amount - csv_attributes.dolg - csv_attributes.razryv_1stlink_sum - csv_attributes.enforce_ntfinish_sum_wthtax) / 1000
        attr_175 = ((csv_attributes.pru_cad_cost_amt + csv_attributes.lru_cad_cost_amt + csv_attributes.ts_cad_cost_amt)
                    * 0.2 + csv_attributes.s_1230_4 * 0.0861 + csv_attributes.attr_131 * 0.2) / 1000

        CountedAttributes.objects.create(
            other_property=attr_131,
            clr=attr_132,
            solvency_ratio=attr_133,
            autonomy_ratio=attr_134,
            perc_coverage_ratio=attr_135,
            assets_return=attr_136,
            dolg_in_balance=attr_137,
            return_on_equity=attr_138,
            fin_leverage=attr_139,
            dolg_ebit=attr_140,
            turnover=attr_141,
            turnover_in_credit=attr_142,
            repay_fund=attr_143,
            invest_coverage_ratio=attr_144,
            equity_capital_ratio=attr_145,
            stock_avail_ration=attr_146,
            quick_liquid_ratio=attr_147,
            asset_dinam_1=attr_148,
            asset_dinam_2=attr_149,
            asset_dinam_3=attr_150,
            profit_dinam_1=attr_151,
            profit_dinam_2=attr_152,
            profit_dinam_3=attr_153,
            k_5_154=attr_154,
            k_6_155=attr_155,
            k_7_156=attr_156,
            k_8_157=attr_157,
            k_9_158=attr_158,
            k_10_159=attr_159,
            property_sum=attr_160,
            k_1_161=attr_161,
            k_2_162=attr_162,
            k_3_163=attr_163,
            k_4_164=attr_164,
            revenue_dinam=attr_165,
            current_business_value=attr_166,
            liquid_business_value=attr_167,
            repay_fund_lender=attr_168,
            need_capital=attr_169,
            need_capital_dp=attr_170,
            ebitda=attr_171,
            dolg_score=attr_172,
            dolg_dp=attr_173,
            need_capital_rub=attr_174,
            need_capital_dp_rub=attr_175
        )

    csv_attributes_list = CsvAttributes.objects.all()

    for csv_attributes in csv_attributes_list:
        calculate_counted_attributes(csv_attributes)


@api_view(['GET', 'POST'])
def CsvAttributesListViewSet(request):  # (viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    EXPORT_FORMATS_DICT = {
        "csv": CSV.CONTENT_TYPE,
        "xlsx": XLSX.CONTENT_TYPE,
    }
    IMPORT_FORMATS_DICT = EXPORT_FORMATS_DICT

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

        serializer = CsvAttributesSerialiser(
            data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                         'count': paginator.count,
                         'numpages': paginator.num_pages,
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
            raise ImportError("Unsupport import format",
                              code="unsupport_import_format")

        result = csv_resource.import_data(
            dataset,
            dry_run=True,
            collect_failed_rows=True,
            # skip_unchanged=False,
            # report_skipped=True,
            raise_errors=True,
            # skip_diff=True,
        )

        if not result.has_validation_errors() or result.has_errors():
            result = csv_resource.import_data(
                dataset,
                dry_run=False,
                collect_failed_rows=True,
                # skip_unchanged=True,
                # report_skipped=False,
                raise_errors=True,
                # skip_diff=True,
            )
        else:
            raise ImportError("Import data failed", code="import_data_failed")
        
        # TODO Сделать репорт о пропущенных строках!
        return Response(
            data={"message": "Import successed",
                  "result_totals": f"{result.totals}",
                  "result_total_rows": f"{result.total_rows}",
                  "result_base_errors": f"{result.base_errors}",
                  "result_valid_rows": f"{result.valid_rows()}",
                  "result_invalid_rows": f"{result.invalid_rows}",
                  },
            status=status.HTTP_201_CREATED
        )

        # serializer = CsvAttributesSerialiser(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def CatalogFieldsListViewSet(request):
    permission_classes = (IsAuthenticated,)
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        fields = MainCatalogFields.objects.all().order_by('id')
        page = request.GET.get('page', 1)
        paginator = Paginator(fields, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = MainCatalogFieldsSerializer(
            data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                         'count': paginator.count,
                         'numpages': paginator.num_pages,
                         'nextlink': '/api/catalog_fields/?page=' + str(nextPage),
                         'prevlink': '/api/catalog_fields/?page=' + str(previousPage)})
    elif request.method == 'POST':
        serializer = MainCatalogFieldsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

        serializer = CountedAttributesSerializer(
            data, context={'request': request}, many=True)
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
        serializer = CountedAttributesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def ScoringModelListViewSet(request):
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        score_model = ScoringModel.objects.all().order_by('id')
        page = request.GET.get('page', 1)
        paginator = Paginator(score_model, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ScoringModelSerializer(
            data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                         'count': paginator.count,
                         'numpages': paginator.num_pages,
                         'nextlink': '/api/catalog_fields/?page=' + str(nextPage),
                         'prevlink': '/api/catalog_fields/?page=' + str(previousPage)})
    elif request.method == 'POST':
        serializer = ScoringModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def ScoringModelDetailViewSet(request, pk):
    try:
        score_model_id = ScoringModel.objects.get(pk=pk)
    except ScoringModel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ScoringModelSerializer(
            score_model_id, context={'request': request})
        return Response({'data': serializer.data, })

    elif request.method == 'PUT':
        serializer = ScoringModelSerializer(
            score_model_id, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        score_model_id.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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


@api_view(['POST'])
def CreateRelationScoreModelAndCountedAttributesViewSet(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        counted_attr_ids = data.get('counted_attr_ids')
        scoring_model_id = data.get('scoring_model_id')
        scoring_model = ScoringModel.objects.get(id=scoring_model_id)

        for counted_attr_id in counted_attr_ids:
            counted_attr = CountedAttributes.objects.get(id=counted_attr_id)
            counted_attr.scoring_name.add(scoring_model)

        return JsonResponse({'message': 'Relation created successfully'}, status=200)
    return JsonResponse({'message': 'Invalid request method'}, status=400)


@api_view(['POST'])
def CreateRelationInnAndScoringModelViewSet(request):
    if request.method == 'POST':
        inn_ids = request.data.get('inn_ids', [])
        scoring_model_id = request.data.get('scoringmodel_id')

        if inn_ids and scoring_model_id:
            try:
                scoring_model = ScoringModel.objects.get(id=scoring_model_id)
            except ScoringModel.DoesNotExist:
                return Response({'success': False,
                                 'error': 'ScoringModel не найдена'},
                                status=status.HTTP_404_NOT_FOUND)

            for inn_id in inn_ids:
                try:
                    CsvAttributes.objects.get(inn=inn_id)
                except CsvAttributes.DoesNotExist:
                    continue

                inn_res = InnRes.objects.create(inn=inn_id)
                inn_res.scoring_model.add(scoring_model)

            serializer = InnResSerialiser(inn_res)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)
