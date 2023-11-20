# import datetime
from datetime import date
from tempfile import TemporaryDirectory
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
from import_export.results import Result, RowResult, InvalidRow
from .serialiser import *
from .models import *
from .admin import *
from tablib import Dataset
from .exceptions import ExportError, ImportError
import json
from django.http import JsonResponse
from django.db import transaction, connection
import os
from django.http import HttpResponse
from .pyparser import *
import xlsxwriter


# from import_export import mixins
from django.views.generic.list import ListView

from django.db import connection
from django.http import FileResponse


# Uploaded files into DataBase
@api_view(['GET', 'POST'])
def FilesListViewSet(request):  # (viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    if request.method == 'GET':
        # data = []
        # nextPage = 1
        # previousPage = 1
        files = FileAttributes.objects.all().order_by('-id')
        # page = request.GET.get('page', 1)
        # paginator = Paginator(files, 10)
        # try:
        #     data = paginator.page(page)
        # except PageNotAnInteger:
        #     data = paginator.page(1)
        # except EmptyPage:
        #     data = paginator.page(paginator.num_pages)

        serializer = FileAttributesSerialiser(
            files,
            # data, 
            context={'request': request}, 
            many=True
            )
        # if data.has_next():
        #     nextPage = data.next_page_number()
        # if data.has_previous():
        #     previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                        #  'count': paginator.count,
                        #  'numpages': paginator.num_pages,
                        #  'nextlink': '/api/files/?page=' + str(nextPage),
                        #  'prevlink': '/api/files/?page=' + str(previousPage)
                         })
    elif request.method == 'POST':
        serializer = FileAttributesSerialiser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def InsertValuesToCountedAttributes(imported_attributes_list):

    def calculate_counted_attributes(imported_attributes):
        inn = imported_attributes.inn
        # print(inn)
        other_property = imported_attributes.s_1150_4 - imported_attributes.pru_cad_cost_amt - imported_attributes.lru_cad_cost_amt - imported_attributes.lru_cad_cost_amt_6monthago if imported_attributes.s_1150_4 - \
            imported_attributes.pru_cad_cost_amt - imported_attributes.lru_cad_cost_amt - imported_attributes.lru_cad_cost_amt_6monthago > 0 else 0
        # print(other_property)
        clr = imported_attributes.s_1500_4 - \
            imported_attributes.s_1530_4 if imported_attributes.s_1500_4 - \
            imported_attributes.s_1530_4 != 0 else 0
        # print(clr)
        solvency_ratio = imported_attributes.s_1200_4 / \
            (imported_attributes.s_1500_4 + imported_attributes.s_1400_4) if imported_attributes.s_1500_4 + \
            imported_attributes.s_1400_4 != 0 else 0
        # print(solvency_ratio)
        autonomy_ratio = imported_attributes.s_1300_4 / \
            imported_attributes.s_1600_4 if imported_attributes.s_1600_4 != 0 else 0
        # print(autonomy_ratio)
        perc_coverage_ratio = imported_attributes.s_2400_4 / \
            imported_attributes.s_2330_4 if imported_attributes.s_2330_4 != 0 else 0
        # print(perc_coverage_ratio)
        assets_return = imported_attributes.s_2400_4 / \
            imported_attributes.s_1600_4 if imported_attributes.s_1600_4 != 0 else 0
        # print(assets_return)
        dolg_in_balance = imported_attributes.dolg / \
            imported_attributes.s_1600_4 if imported_attributes.s_1600_4 != 0 else 0
        # print(dolg_in_balance)
        return_on_equity = imported_attributes.s_2400_4 / ((imported_attributes.s_1300_4 + imported_attributes.s_1300_5) / 2) * \
            100 if imported_attributes.s_1300_4 + imported_attributes.s_1300_5 != 0 else 0
        # print(return_on_equity)
        fin_leverage = (imported_attributes.s_1500_4 + imported_attributes.s_1400_4) / \
            imported_attributes.s_1300_4 if imported_attributes.s_1300_4 != 0 else 0
        # print(fin_leverage)
        dolg_ebit = (imported_attributes.s_1410_4 + imported_attributes.s_1510_4 - imported_attributes.s_1240_4 - imported_attributes.s_1250_4) / (imported_attributes.s_2110_4 - imported_attributes.s_2120_4 - imported_attributes.s_2210_4 - imported_attributes.s_2220_4 + imported_attributes.s_2310_4 + imported_attributes.s_2320_4 +
                                                                                                                               imported_attributes.s_2340_4 - imported_attributes.s_2350_4) if (imported_attributes.s_2110_4 - imported_attributes.s_2120_4 - imported_attributes.s_2210_4 - imported_attributes.s_2220_4 + imported_attributes.s_2310_4 + imported_attributes.s_2320_4 + imported_attributes.s_2340_4 - imported_attributes.s_2350_4) != 0 else 0
        # print("dolg_ebit", dolg_ebit)
        turnover = imported_attributes.s_2110_4 / \
            ((imported_attributes.s_1600_4 + imported_attributes.s_1600_5) /
             2) if imported_attributes.s_1600_4 + imported_attributes.s_1600_5 != 0 else 0
        # print(turnover)
        turnover_in_credit = (imported_attributes.s_1520_4 + imported_attributes.s_1520_5) / (imported_attributes.s_1230_4 +
                                                                                    imported_attributes.s_1230_5) if imported_attributes.s_1230_4 + imported_attributes.s_1230_5 != 0 else 0
        # print(turnover_in_credit)
        repay_fund = (imported_attributes.account_balance_SKUAD + imported_attributes.pru_cad_cost_amt + imported_attributes.lru_cad_cost_amt - imported_attributes.cad_cost_amt_inpledge +
                      imported_attributes.s_1230_4 * 0.0861 + imported_attributes.ts_cad_cost_amt + other_property) / (imported_attributes.s_1520_4 * 1.069) if imported_attributes.s_1520_4 != 0 else 0
        # print(repay_fund)
        invest_coverage_ratio = (imported_attributes.s_1300_4 + imported_attributes.s_1400_4) / \
            imported_attributes.s_1600_4 if imported_attributes.s_1600_4 != 0 else 0
        # print(invest_coverage_ratio)
        equity_capital_ratio = (imported_attributes.s_1300_4 - imported_attributes.s_1100_4) / \
            imported_attributes.s_1200_4 if imported_attributes.s_1200_4 != 0 else 0
        # print(equity_capital_ratio)
        stock_avail_ration = (imported_attributes.s_1300_4 - imported_attributes.s_1100_4) / \
            imported_attributes.s_1210_4 if imported_attributes.s_1210_4 != 0 else 0
        # print(stock_avail_ration)
        quick_liquid_ratio = (imported_attributes.s_1230_4 + imported_attributes.s_1240_4 + imported_attributes.s_1250_4) / \
            imported_attributes.s_1210_4 if imported_attributes.s_1500_4 != 0 else 0
        # print(quick_liquid_ratio)
        asset_dinam_1 = imported_attributes.s_1600_4 - imported_attributes.s_1600_5
        # print(asset_dinam_1)
        asset_dinam_2 = imported_attributes.s_1600_5 - imported_attributes.s_1600_4_2yearago
        # print(asset_dinam_2)
        asset_dinam_3 = imported_attributes.s_1600_4_2yearago - imported_attributes.s_1600_5_2yearago
        # print("asset_dinam_3", asset_dinam_3)
        profit_dinam_1 = imported_attributes.s_2400_4 - imported_attributes.s_2400_5
        # print(profit_dinam_1)
        profit_dinam_2 = imported_attributes.s_2400_5 - imported_attributes.s_2400_4
        # print(profit_dinam_2)
        profit_dinam_3 = imported_attributes.s_2400_4 - imported_attributes.s_2400_5_2yearago
        # print(profit_dinam_3)
        k_5_154 = imported_attributes.s_1200_4 / \
            imported_attributes.s_1500_4 if imported_attributes.s_1500_4 != 0 else 0
        # print(k_5_154)
        k_6_155 = imported_attributes.s_1300_4 / (imported_attributes.s_1510_4 + imported_attributes.s_1400_4 + imported_attributes.s_1550_4 +
                                             imported_attributes.s_1520_4) if imported_attributes.s_1510_4 + imported_attributes.s_1400_4 + imported_attributes.s_1550_4 + imported_attributes.s_1520_4 != 0 else 0
        # print(k_6_155)
        k_7_156 = (imported_attributes.s_2400_4 + imported_attributes.s_2330_4 + imported_attributes.s_2410_4) / \
            imported_attributes.s_2330_4 if imported_attributes.s_2330_4 != 0 else 0
        # print(k_7_156)
        k_8_157 = imported_attributes.s_2200_4 / \
            imported_attributes.s_1100_4 if imported_attributes.s_1100_4 != 0 else 0
        # print(k_8_157)
        k_9_158 = imported_attributes.s_1300_4 / \
            imported_attributes.s_1600_4 if imported_attributes.s_1600_4 != 0 else 0
        # print(k_9_158)
        k_10_159 = (imported_attributes.s_1400_4 + imported_attributes.s_1500_4) / \
            imported_attributes.s_1300_4 if imported_attributes.s_1300_4 != 0 else 0
        # print(k_10_159)
        property_sum = imported_attributes.pru_cad_cost_amt + \
            imported_attributes.lru_cad_cost_amt + imported_attributes.ts_cad_cost_amt
        # print("property_sum ", property_sum)
        k_1_161 = (imported_attributes.enforce_ntfinish_sum_wthtax + imported_attributes.dolg) * \
            100 / imported_attributes.s_1520_4 - 100 if imported_attributes.s_1520_4 != 0 else 0
        # print(k_1_161)
        k_2_162 = imported_attributes.s_1210_4 * 100 / imported_attributes.s_1150_4 - \
            100 if imported_attributes.s_1150_4 != 0 else 0
        # print("k_2_162", k_2_162)
        k_3_163 = (imported_attributes.npo_2_010_year + imported_attributes.npo_4_010 + imported_attributes.npo_5_060) * \
            100 / imported_attributes.s_2110_4 - 100 if imported_attributes.s_2110_4 != 0 else 0
        # print("k_3_163", k_3_163)
        k_4_164 = 100 if (imported_attributes.s_1510_4 + imported_attributes.s_1410_4) == 0 and imported_attributes.cad_cost_amt_inpledge > 0 else (
            imported_attributes.cad_cost_amt_inpledge * 100 / (imported_attributes.s_1510_4 + imported_attributes.s_1410_4) - 100)
        # print("k_4_164", k_4_164)
        revenue_dinam = 100 if imported_attributes.npo_2_020_thisyear > 0 and imported_attributes.npo_2_020_lastyear != 0 else (
            (imported_attributes.npo_2_020_thisyear - imported_attributes.npo_2_020_lastyear) * 100 / imported_attributes.npo_2_020_lastyear - 100) if imported_attributes.npo_2_020_lastyear != 0 else 0
        # print("revenue_dinam ", revenue_dinam)
        # print(f"""account_balance_SKUAD {imported_attributes.account_balance_SKUAD}\nproperty_sum{property_sum}\ns_1230_4{imported_attributes.s_1230_4}
        #         \nother_property{other_property}\ns_1210_4{imported_attributes.s_1210_4}\nnpo_2_060_year{imported_attributes.npo_2_060_year}
        #         \nstcontract_amount{imported_attributes.stcontract_amount}\ndolg{imported_attributes.dolg}\nrazryv_1stlink_sum{imported_attributes.razryv_1stlink_sum}\nenforce_ntfinish_sum_wthtax{imported_attributes.enforce_ntfinish_sum_wthtax}"""
        #       )
        
        current_business_value = (imported_attributes.account_balance_SKUAD + property_sum + imported_attributes.s_1230_4 * 0.0861 + other_property + imported_attributes.s_1210_4 +
                                  imported_attributes.npo_2_060_year + imported_attributes.stcontract_amount - imported_attributes.dolg - imported_attributes.razryv_1stlink_sum - imported_attributes.enforce_ntfinish_sum_wthtax) / 1000000
        # print(current_business_value)
        # print(imported_attributes.account_balance_SKUAD, 
            #   property_sum, imported_attributes.s_1230_4, 
            #   other_property, imported_attributes.s_1210_4, 
            #   imported_attributes.npo_2_060_year,
            #   imported_attributes.stcontract_amount, 
            #   imported_attributes.dolg, 
            #   imported_attributes.razryv_1stlink_sum,
            #   imported_attributes.enforce_ntfinish_sum_wthtax)
        
        liquid_business_value = ((imported_attributes.pru_cad_cost_amt + imported_attributes.lru_cad_cost_amt + imported_attributes.ts_cad_cost_amt)
                                 * 0.2 + imported_attributes.s_1230_4 * 0.0861 + other_property * 0.2) / 1000000
        # print(liquid_business_value)
        repay_fund_lender = ((imported_attributes.account_balance_SKUAD + (imported_attributes.pru_cad_cost_amt + imported_attributes.lru_cad_cost_amt + imported_attributes.ts_cad_cost_amt) * 0.2 + imported_attributes.s_1230_4 * 0.0861 +
                              other_property * 0.2) * 100) / (imported_attributes.s_1500_4 + imported_attributes.s_1400_4 + imported_attributes.dolg) if (imported_attributes.s_1500_4 + imported_attributes.s_1400_4 + imported_attributes.dolg) != 0 else 0
        # print(repay_fund_lender)
        need_capital = ((imported_attributes.s_1300_5 / imported_attributes.s_1300_4) / 1000000 - imported_attributes.s_1300_4 / 1000000) if imported_attributes.s_1300_4 != 0 and (
            (imported_attributes.s_1300_5 / imported_attributes.s_1300_4) < 0 or (imported_attributes.s_1300_5 / imported_attributes.s_1300_4) > 3) else 0
        # print(need_capital)
        need_capital_dp = ((imported_attributes.s_1410_4 / imported_attributes.s_1300_4) / 1000000 - imported_attributes.s_1300_4 / 1000000) if imported_attributes.s_1300_4 != 0 and (
            (imported_attributes.s_1410_4 / imported_attributes.s_1300_4) < 0 or (imported_attributes.s_1410_4 / imported_attributes.s_1300_4) > 3) else 0
        # print(need_capital_dp)
        ebitda = imported_attributes.npo_2_010_year + imported_attributes.npo_2_020_year - \
            imported_attributes.npo_2_030_year - imported_attributes.npo_2_040_year
        # print(ebitda)
        dolg_score = imported_attributes.s_1520_4 + \
            imported_attributes.s_1450_4 + imported_attributes.s_1550_4
        # print(dolg_score)
        dolg_dp = imported_attributes.s_1410_4 + imported_attributes.s_1450_4 + \
            imported_attributes.s_1510_4 + imported_attributes.s_1520_4
        # print(dolg_dp)
        need_capital_rub = (imported_attributes.account_balance_SKUAD + property_sum + imported_attributes.s_1230_4 * 0.0861 + other_property + imported_attributes.s_1210_4 +
                            imported_attributes.npo_2_060_year + imported_attributes.stcontract_amount - imported_attributes.dolg - imported_attributes.razryv_1stlink_sum - imported_attributes.enforce_ntfinish_sum_wthtax) / 1000
        # print(need_capital_rub)
        need_capital_dp_rub = ((imported_attributes.pru_cad_cost_amt + imported_attributes.lru_cad_cost_amt + imported_attributes.ts_cad_cost_amt)
                               * 0.2 + imported_attributes.s_1230_4 * 0.0861 + other_property * 0.2) / 1000
        # print(need_capital_dp_rub)

        CountedAttributesNew.objects.create(
            inn=inn,
            other_property=other_property,
            clr=clr,
            solvency_ratio=solvency_ratio,
            autonomy_ratio=autonomy_ratio,
            perc_coverage_ratio=perc_coverage_ratio,
            assets_return=assets_return,
            dolg_in_balance=dolg_in_balance,
            return_on_equity=return_on_equity,
            fin_leverage=fin_leverage,
            dolg_ebit=dolg_ebit,
            turnover=turnover,
            turnover_in_credit=turnover_in_credit,
            repay_fund=repay_fund,
            invest_coverage_ratio=invest_coverage_ratio,
            equity_capital_ratio=equity_capital_ratio,
            stock_avail_ration=stock_avail_ration,
            quick_liquid_ratio=quick_liquid_ratio,
            asset_dinam_1=asset_dinam_1,
            asset_dinam_2=asset_dinam_2,
            asset_dinam_3=asset_dinam_3,
            profit_dinam_1=profit_dinam_1,
            profit_dinam_2=profit_dinam_2,
            profit_dinam_3=profit_dinam_3,
            k_5_154=k_5_154,
            k_6_155=k_6_155,
            k_7_156=k_7_156,
            k_8_157=k_8_157,
            k_9_158=k_9_158,
            k_10_159=k_10_159,
            property_sum=property_sum,
            k_1_161=k_1_161,
            k_2_162=k_2_162,
            k_3_163=k_3_163,
            k_4_164=k_4_164,
            revenue_dinam=revenue_dinam,
            current_business_value=current_business_value,
            liquid_business_value=liquid_business_value,
            repay_fund_lender=repay_fund_lender,
            need_capital=need_capital,
            need_capital_dp=need_capital_dp,
            ebitda=ebitda,
            dolg_score=dolg_score,
            dolg_dp=dolg_dp,
            need_capital_rub=need_capital_rub,
            need_capital_dp_rub=need_capital_dp_rub
        )


    # imported_attributes_list = ImportedAttributes.objects.filter(created_date__contains=datetime.date.today())

    imported_attributes_with_error = []
    for imported_attributes in imported_attributes_list:
        try:
            calculate_counted_attributes(imported_attributes)
        except:
            imported_attributes_with_error.append(imported_attributes)
    return imported_attributes_with_error, len(imported_attributes_with_error)


@api_view(['GET', 'POST'])
def ImportedAttributesListViewSet(request):  # (viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    EXPORT_FORMATS_DICT = {
        "csv": CSV.CONTENT_TYPE,
        "xlsx": XLSX.CONTENT_TYPE,
    }
    IMPORT_FORMATS_DICT = EXPORT_FORMATS_DICT

    if request.method == 'GET':
        # data = []
        # nextPage = 1
        # previousPage = 1
        attributes = ImportedAttributes.objects.all().order_by('id')
        # page = request.GET.get('page', 1)
        # paginator = Paginator(attributes, 10)
        # try:
        #     data = paginator.page(page)
        # except PageNotAnInteger:
        #     data = paginator.page(1)
        # except EmptyPage:
        #     data = paginator.page(paginator.num_pages)

        serializer = ImportedAttributesSerialiser(
            attributes,
            # data, 
            context={'request': request}, 
            many=True
            )
        # if data.has_next():
        #     nextPage = data.next_page_number()
        # if data.has_previous():
        #     previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                        #  'count': paginator.count,
                        #  'numpages': paginator.num_pages,
                        #  'nextlink': '/api/attributes/?page=' + str(nextPage),
                        #  'prevlink': '/api/attributes/?page=' + str(previousPage)
                         })
    elif request.method == 'POST':
        filename = request.FILES["filename"]
        # print(request.FILES['filename'].size)
        extension = filename.name.split(".")[-1].lower()
        dataset = Dataset()

        csv_resource = ImportedAttributesResource()

        if extension in IMPORT_FORMATS_DICT:
            dataset.load(filename.read(), format=extension)
        else:
            raise ImportError("Unsupport import format",
                              code="unsupport_import_format")
        
        ############ Чтобы получить id файла, который загружается ###############################################

        with transaction.atomic():
            serializer_body = FileAttributesSerialiser(data=request.data)
            if not serializer_body.is_valid():
                transaction.set_rollback(True)
                return Response(serializer_body.errors, status=status.HTTP_400_BAD_REQUEST)
            serializer_body.save()
            
            get_file_id = FileAttributes.objects.latest('id').id
            
            dataset.append_col([get_file_id for _ in range(len(dataset))], header='file_id')
            # print(dataset)
		
        #######################################################################################################

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
        
        # print("IMPORT_TYPE_NEW - ", result.totals[RowResult.IMPORT_TYPE_NEW])
        # print("IMPORT_TYPE_UPDATE - ", result.totals[RowResult.IMPORT_TYPE_UPDATE])
        # print("result.total_rows", result.total_rows)

        FileAttributes.objects.filter(id=get_file_id).update(
            import_new_rows = result.totals[RowResult.IMPORT_TYPE_NEW],
            import_update_rows = result.totals[RowResult.IMPORT_TYPE_UPDATE],
            import_total_rows = result.total_rows,
            filesize = request.FILES['filename'].size,
        )       
        
        # inns_list_for_counted = ImportedAttributes.objects.filter(created_date__contains=datetime.date.today())
        # print(inns_list_for_counted)

        if result.totals[RowResult.IMPORT_TYPE_NEW]:
            InsertValuesToCountedAttributes(ImportedAttributes.objects.filter(created_date__contains=date.today()))

        def delete_files(directory):
            try:
                file_list = os.listdir(directory)
                for filename in file_list:
                    file_path = os.path.join(directory, filename) 
                    if os.path.isfile(file_path): 
                        os.remove(file_path)
                return "Files deleted"
            except:
                return "Files wasn't deleted"
        
        delete_files("./media/store")

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
        # data = []
        # nextPage = 1
        # previousPage = 1
        fields = MainCatalogFields.objects.all().order_by('id')
        # page = request.GET.get('page', 1)
        # paginator = Paginator(fields, 10)
        # try:
        #     data = paginator.page(page)
        # except PageNotAnInteger:
        #     data = paginator.page(1)
        # except EmptyPage:
        #     data = paginator.page(paginator.num_pages)

        serializer = MainCatalogFieldsSerializer(
            fields,
            # data, 
            context={'request': request}, 
            many=True)
        # if data.has_next():
        #     nextPage = data.next_page_number()
        # if data.has_previous():
        #     previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                        #  'count': paginator.count,
                        #  'numpages': paginator.num_pages,
                        #  'nextlink': '/api/catalog_fields/?page=' + str(nextPage),
                        #  'prevlink': '/api/catalog_fields/?page=' + str(previousPage)
                         })
    elif request.method == 'POST':
        serializer = MainCatalogFieldsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def CatalogsListViewSet(request):
    permission_classes = (IsAuthenticated,)
    if request.method == 'GET':
        # data = []
        # nextPage = 1
        # previousPage = 1
        fields = MainCatalog.objects.all().order_by('id')
        # page = request.GET.get('page', 1)
        # paginator = Paginator(fields, 10)
        # try:
        #     data = paginator.page(page)
        # except PageNotAnInteger:
        #     data = paginator.page(1)
        # except EmptyPage:
        #     data = paginator.page(paginator.num_pages)

        serializer = MainCatalogSerializer(
            fields,
            # data, 
            context={'request': request}, 
            many=True)
        # if data.has_next():
        #     nextPage = data.next_page_number()
        # if data.has_previous():
        #     previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                        #  'count': paginator.count,
                        #  'numpages': paginator.num_pages,
                        #  'nextlink': '/api/catalogs/?page=' + str(nextPage),
                        #  'prevlink': '/api/catalogs/?page=' + str(previousPage)
                         })
    elif request.method == 'POST':
        serializer = MainCatalogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author_id=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def MarkersAttributesListViewSet(request):
    permission_classes = (IsAuthenticated,)
    if request.method == 'GET':
        # data = None
        # paginator = None
        # next_page = None
        # previous_page = None
        attributes = MarkersAttributes.objects.all().order_by('-id')
        # paginator = Paginator(attributes, 10)
        # page = request.GET.get('page', 1)
        # try:
        #     data = paginator.page(page)
        # except PageNotAnInteger:
        #     data = paginator.page(1)
        # except EmptyPage:
        #     data = paginator.page(paginator.num_pages)

        serializer = MarkersAttributesSerializer(
            attributes,
            # data, 
            context={'request': request}, 
            many=True
            )
        # next_page = paginator.next_page_number() if data.has_next() else None
        # previous_page = paginator.previous_page_number() if data.has_previous() else None

        return Response({
            'data': serializer.data,
            # 'count': paginator.count,
            # 'numpages': paginator.num_pages,
            # 'nextlink': '/api/counted_attr/?page=' + str(next_page),
            # 'prevlink': '/api/counted_attr/?page=' + str(previous_page)
        })
    elif request.method == 'POST':
        serializer = MarkersAttributesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def MarkersAttributesDetailViewSet(request, pk):
    try:
        marker_id = MarkersAttributes.objects.get(pk=pk)
    except ScoringModel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MarkersAttributesSerializer(
            marker_id, context={'request': request})
        return Response({'data': serializer.data, })

    elif request.method == 'PUT':
        serializer = MarkersAttributesSerializer(
            marker_id, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        marker_id.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def DeleteMarkerViewSet(request, pk_model, pk_marker):
    if request.method == 'GET':

        scoring_model = ScoringModel.objects.get(id=pk_model)
        counted_attr = MarkersAttributes.objects.get(id=pk_marker)
        scoring_model.marker_id.remove(counted_attr)
        scoring_model.save()
    
        return Response({'message': 'Маркер удален'}, status=status.HTTP_200_OK)
        
    return Response({'message': 'Метод не найден'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def ScoringModelListViewSet(request):
    if request.method == 'GET':
        # data = []
        # nextPage = 1
        # previousPage = 1
        score_model = ScoringModel.objects.all().order_by('id')
        # page = request.GET.get('page', 1)
        # paginator = Paginator(score_model, 10)
        # try:
        #     data = paginator.page(page)
        # except PageNotAnInteger:
        #     data = paginator.page(1)
        # except EmptyPage:
        #     data = paginator.page(paginator.num_pages)

        serializer = ScoringModelSerializer(
            score_model,
            # data, 
            context={'request': request}, 
            many=True)
        # if data.has_next():
        #     nextPage = data.next_page_number()
        # if data.has_previous():
        #     previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                        #  'count': paginator.count,
                        #  'numpages': paginator.num_pages,
                        #  'nextlink': '/api/catalog_fields/?page=' + str(nextPage),
                        #  'prevlink': '/api/catalog_fields/?page=' + str(previousPage)
                         })
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
def CreateRelationScoreModelAndMarkersAttributesViewSet(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        counted_attr_ids = data.get('counted_attr_ids')
        scoring_model_id = data.get('scoring_model_id')
        scoring_model = ScoringModel.objects.get(id=scoring_model_id)

        for counted_attr_id in counted_attr_ids:
            counted_attr = MarkersAttributes.objects.get(id=counted_attr_id)
            # counted_attr.scoring_name.add(scoring_model)
            scoring_model.marker_id.add(counted_attr)

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
                    ImportedAttributes.objects.get(inn=inn_id)
                except ImportedAttributes.DoesNotExist:
                    continue
                
                ### Процесс отлаживания функцилнала - при наличии связки не создавать новой
                # if scoring_model.inns.filter(inn=inn_id).exists():
                #     continue

                # try:
                #     inn_res = InnRes.objects.get(inn=inn_id)
                # except InnRes.DoesNotExist:
                #     inn_res = InnRes.objects.create(inn=inn_id)
                
                # if not InnRes.objects.get(inn=inn_id):
                #     inn_res = InnRes.objects.create(inn=inn_id)
                # else:
                #     inn_res = InnRes.objects.get(inn=inn_id)

                inn_res = InnRes.objects.create(inn=inn_id)
                scoring_model.inns.add(inn_res)

            serializer = InnResSerialiser(inn_res)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)


def DownloadTryViewSet(request):
    # model = ImportedAttributes
    # if request.method == 'POST':
    attr = InnRes.objects.all()
    resource = InnResResource()
    ds = resource.export(attr)

    response = HttpResponse(ds.xlsx, content_type='text/xlsx')
    response['Content-Disposition'] = 'attachment; filename="ScotringResults.xlsx"'
    return response


@api_view(['GET', 'POST'])
def InnAndResultsListViewSet(request):
    permission_classes = (IsAuthenticated,)
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        fields = InnRes.objects.all().order_by('id')
        page = request.GET.get('page', 1)
        paginator = Paginator(fields, 20)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = InnResSerialiser(
            data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                         'count': paginator.count,
                         'numpages': paginator.num_pages,
                         'nextlink': '/api/inn_res/?page=' + str(nextPage),
                         'prevlink': '/api/inn_res/?page=' + str(previousPage)})
    elif request.method == 'POST':
        serializer = InnResSerialiser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
def InnAndResultsDetailViewSet(request, pk):
    try:
        inn_result_id = InnRes.objects.get(pk=pk)
    except InnRes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = InnResSerialiser(
            inn_result_id, context={'request': request})
        return Response({'data': serializer.data, })

    elif request.method == 'PUT':
        serializer = InnResSerialiser(
            inn_result_id, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        inn_result_id.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# @api_view(['POST'])
# def StartScoringViewSet(request):
#     if request.method == 'POST':
#         data = json.loads(request.body.decode('utf-8'))
        
#         rank = 0.0 
#         inn_list, marker_formula_list = [], []
#         for key, value in data["model"].items():
#             # print("key -", key,"\nvalue - ", value)
#             # print('\n')
#             if key == "inns":
#                 for val in value:
#                     # print(val)
#                     for k, v in val.items():
#                         # print("inns.keys", k ,"inns.values", v)
#                         if k == "inn":
#                             inn_list.append(v)
#             elif key == "marker_id":
#                 for val in value:
#                     # print(val)
#                     for k, v in val.items():
#                         # print("marker_id.keys", k ,"marker_id.values", v)
#                         if k == "py_query":
#                             marker_formula_list.append(v)
        
#         # print(inn_list)
#         print(marker_formula_list)
#         # print(CsvAttributes.objects.get(inn=inn_list[0]).np_name)

#         dict_markers = {}
#         list_markers = []
#         for inn in inn_list:
#             for formula in marker_formula_list:
#                 try:
#                     imported_attributes = ImportedAttributes.objects.get(inn=inn)
#                     counted_attributes = CountedAttributesNew.objects.get(inn=inn)
#                 except ImportedAttributes.DoesNotExist or CountedAttributesNew.DoesNotExist:
#                     continue
#                 print("VALUE",value)
#                 value = eval(formula)
#                 ####################
#                 # TODO Добавить парсер для получения значения в формуле 



#                 ####################
#                 list_markers.append({'formula': formula, "value": value})
                
#                 rank += value
#                 print(value)
#                 # inn_res = InnRes.objects.filter(inn=inn).update(result_score=rank) 
#                 # inn_res.save()

#             total_json = {
#                 "markers_and_values": list_markers,
#                 "total_rank": rank
#             }
#             dict_markers.update(total_json)
#             print(dict_markers)
#             InnRes.objects.filter(inn=inn).update(result_score=dict_markers) 
#             # InnRes.objects.create(markers_json=dict_markers)
#             dict_markers = {}

#         return JsonResponse({'message': 'Results were updated '}, status=200)

#     return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def StartScoringViewSet(request):
    if request.method == 'POST':
        # TODO ПРОИСХОДИТ ОБНОВЛЕНИЕ ОДИНАКОВЫХ ИНН ДЛЯ РАЗНЫХ МОДЕЛЕЙ - ИСПРАВИТЬ 

        inn_list, marker_formula_list = [], []
        for inn in request.data.get("model")["inns"]:
            inn_list.append((inn["inn"], 
                             inn["id"]))
        for marker_formula in request.data.get("model")["marker_id"]:
            # marker_formula_list.append(marker_formula["py_query"])
            marker_formula_list.append((marker_formula["name_marker_attr"], 
                                        marker_formula["py_query"], 
                                        marker_formula["target_formula_value"]))

        rank = 0.0 
        dict_markers = {}
        list_markers = []
        for inn, idx in inn_list:
            try:
                imported_attributes = ImportedAttributes.objects.get(inn=inn)
                counted_attributes = CountedAttributesNew.objects.get(inn=inn)
            except (ImportedAttributes.DoesNotExist , CountedAttributesNew.DoesNotExist):
                continue

            for marker_name, formula, target_value in marker_formula_list:
                if formula.startswith("Error"):
                    list_markers.append({
                        "marker_name": marker_name,
                        "formula": formula,
                        "target_value": "-", 
                        "value": 0,
                        "error": formula,
                         })
                    rank += 0
                else:
                    try:
                        counting_rank = eval(formula)
                        if target_value:
                            counting_target_value = eval(target_value)
                        else:
                            counting_target_value = "Нет значения для маркера"
                        # counting_target_value = eval(target_value)
                        list_markers.append({
                            "marker_name": marker_name,
                            "formula": formula,
                            "target_value": counting_target_value,  
                            "value": counting_rank,
                            "error": "",
                            }) 
                        rank += counting_rank
                    except Exception as e:
                        list_markers.append({
                            "marker_name": marker_name,
                            "formula": formula,
                            "target_value": "-",
                            "value": 0, 
                            "error": f"{e}",
                            })
                        rank += 0


            # for formula in marker_formula_list:
            #     # print("\nformula IN FOR",formula)
            #     # print("\nimported_attributes.dolg", imported_attributes.dolg)
            #     # print("imported_attributes.s_1600_4", imported_attributes.s_1600_4)

            #     if formula.startswith("Error"):
            #          list_markers.append({
            #              "formula": formula, 
            #              "value": 0,
            #              "error": formula,
            #              })
            #          rank += 0
            #     else:
            #         try:
            #             counting_rank = eval(formula)
            #             list_markers.append({
            #                     "formula": formula, 
            #                     "value": counting_rank,
            #                     "error": "",
            #                     }) 
            #             rank += counting_rank
            #         except Exception as e:
            #             list_markers.append({
            #                     "formula": formula, 
            #                     "value": 0, 
            #                     "error": f"{e}",
            #                     })
            #             rank += 0

            #     # print("\nRANK", rank)
            #     # inn_res = InnRes.objects.filter(inn=inn).update(result_score=rank) 
            #     # inn_res.save()
            
            total_json = {
                "markers_and_values": list_markers,
                "total_rank": rank
            }
            dict_markers.update(total_json)

            # print("\n")
            # print("dict_markers", dict_markers)
            InnRes.objects.filter(id=idx).update(result_score=dict_markers)
        #     # InnRes.objects.create(markers_json=dict_markers)
            dict_markers.clear()
            list_markers = []
            rank = 0.0 

        return Response({'message': 'Results were updated '}, status=status.HTTP_200_OK)
    return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def StartTestScoringViewSet(request):
    if request.method == 'POST':
        # data = json.loads(request.body.decode('utf-8'))

        rank = 0.0 
        # inn_list, marker_formula_list = [], []
        # for key, value in data["model"].items():
        #     if key == "inns":
        #         for val in value:
        #             # print(val)
        #             for k, v in val.items():
        #                 # print("inns.keys", k ,"inns.values", v)
        #                 if k == "inn":
        #                     inn_list.append(v)
        #     elif key == "marker_id":
        #         for val in value:
        #             # print(val)
        #             for k, v in val.items():
        #                 # print("marker_id.keys", k ,"marker_id.values", v)
        #                 if k == "py_query":
        #                     marker_formula_list.append(v)


        # print(request.data)
        inn_list, marker_formula_list = [], []
        for inn in request.data.get("model")["inns"]:
            inn_list.append(inn["inn"])
        for marker_formula in request.data.get("model")["marker_id"]:
            marker_formula_list.append((marker_formula["name_marker_attr"], 
                                        marker_formula["py_query"], 
                                        marker_formula["target_formula_value"]))
        # print(inn_list)

        # dict_markers = {}
        list_markers, total_json_array = [], []
        for inn in inn_list:
            try:
                # print("TRY")
                imported_attributes = ImportedAttributes.objects.get(inn=inn)
                counted_attributes = CountedAttributesNew.objects.get(inn=inn)
            except (ImportedAttributes.DoesNotExist , CountedAttributesNew.DoesNotExist):
                # print("EXCEPT")
                continue
            # print("INN", inn)
            for marker_name, formula, target_value in marker_formula_list:
                # print("FORMULA", formula)
                # try:
                #     imported_attributes = ImportedAttributes.objects.get(inn=inn)
                #     counted_attributes = CountedAttributesNew.objects.get(inn=inn)
                # except ImportedAttributes.DoesNotExist or CountedAttributesNew.DoesNotExist:
                #     continue
                # value = eval(formula)
                # print("VALUE", value)
                # list_markers.append({'formula': formula, "value": value })
                # rank += value
                if formula.startswith("Error"):
                    list_markers.append({
                        "marker_name": marker_name,
                        "formula": formula,
                        "target_value": "-", 
                        "value": 0,
                        "error": formula,
                         })
                    rank += 0
                else:
                    try:
                        counting_rank = eval(formula)
                        print(counting_rank, formula)
                        if target_value:
                            counting_target_value = eval(target_value)
                            print("counting_target_value", counting_target_value)
                        else:
                            counting_target_value = "Нет значения для маркера"
                        print(counting_target_value)
                        list_markers.append({
                            "marker_name": marker_name,
                            "formula": formula,
                            "target_value": counting_target_value,  
                            "value": counting_rank,
                            "error": "",
                            }) 
                        rank += counting_rank
                    except Exception as e:
                        print("Except", target_value, formula)
                        list_markers.append({
                            "marker_name": marker_name,
                            "formula": formula,
                            "target_value": "-",
                            "value": 0, 
                            "error": f"{e}",
                            })
                        rank += 0

                # if formula.startswith("Error"):
                #      list_markers.append({
                #          "formula": formula, 
                #          "value": 0,
                #          "error": formula,
                #          })
                #      rank += 0
                # else:
                #     try:
                #         counting_rank = eval(formula)
                #         list_markers.append({
                #                 "formula": formula, 
                #                 "value": counting_rank,
                #                 "error": "",
                #                 }) 
                #         rank += counting_rank
                #     except Exception as e:
                #         list_markers.append({
                #                 "formula": formula, 
                #                 "value": 0, 
                #                 "error": f"{e}",
                #                 })
                #         rank += 0

            total_json = {
                "markers_and_values": list_markers,
                "total_rank": rank,
                "inn": inn
            }

            total_json_array.append(total_json)
            # print(total_json_array)
            list_markers = []
            rank = 0
        # print(total_json_array)

        return Response({'message': 'Results were updated', 
                         "response": total_json_array}, 
                         status=status.HTTP_200_OK)
    return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def ForJournalViewSet(request):

    columns = ["scoring_model_id", "model_name", "model_author", "inn_id", "created_date", "inn", "result_score"]
    with connection.cursor() as cursor:
    
        text_query = """
            select 
                smi.scoringmodel_id
                , sm.model_name 
                , sm.author_id
                , smi.innres_id 
                , ir.created_date 
                , ir.inn
                , ir.result_score
            from scoring_model sm 
            join scoring_model_inns smi 
            on sm.id = smi.scoringmodel_id 
            join inn_res ir on ir.id = smi.innres_id 
            order by smi.scoringmodel_id
            ;
            """
        cursor.execute(text_query)
        data = cursor.fetchall()
        test_dict = {}
        df = pd.DataFrame(data, columns=columns).fillna('')
        
        begin_date = df.iloc[0]["created_date"].date()
        begin_scoring_model_id = df.iloc[0]["scoring_model_id"]
        scoring_data_same_date, total_array_with_date = [], []
        row = 0
        while row < len(df):
            print(row)
            if df.iloc[row]["scoring_model_id"] == begin_scoring_model_id:
                if df.iloc[row]["created_date"].date() == begin_date:
                    # print(df.iloc[row])
                    scoring_data_same_date.append(df[["inn_id", 
                                                      "created_date", 
                                                      "inn", 
                                                    #   "result_score"
                                                      ]] \
                                                  .iloc[row] \
                                                  .to_dict())
                else:
                    print("ELSE", row)
                    begin_date = df.iloc[row]["created_date"].date()
                    print(begin_date)
                    total_array_with_date.append(scoring_data_same_date)
                    # row -= 1
                    print(row)
            else:
                #TODO Начать новый массив данных 
                #TODO Где-то предусмотреть обновление  begin_date и begin_scoring_model_id
                pass
            row += 1

            # print("test_dict",df.iloc[row].to_dict())
        # print(scoring_data_same_date)
        print("\ntotal_array_with_date", total_array_with_date)
    return Response({'message': 'Results', 
                     "response":json.loads(df.to_json(orient="records")) }, 
                     status=status.HTTP_200_OK)


@api_view(['GET'])
def DownloadJournalData(request):

    date_time = request.GET.get('date') # "2023-11-11 15:15"
    user_id = request.GET.get('user')
    model_id = request.GET.get('model')

    where_data = ""
    if not date_time is None:
        where_data = f"AND date(ir.created_date) = {date_time}"

    where_user_id = ""
    if not user_id is None:
        where_user_id = f"AND sm.author_id = {user_id}"

    where_model_id = ""
    if not model_id is None:
        where_model_id = f"AND smi.scoringmodel_id = {model_id}"

    guid = 'file_db_import_' + uuid.uuid4().hex

    #Создадим дирректорию для хранения файлов
    dir_name = 'statistic_files'
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)

    filename = f'{dir_name}/journal_{guid}.xlsx'
    columns = ["id модели", 
               "Пользователь",
               "Наименование организации", 
               "Дата сведений", 
               "Модель",
               "ИНН", 
               "Ключ",
               "Значение"]
  
    with connection.cursor() as cursor:
        text_query = f"""
            SELECT 
                smi.scoringmodel_id as model_id,
                sm.author_id,
                ia.np_name,
                ia.report_date,
                sm.model_name,
                ir.inn,
                tr.key, 
                tr.value 
                
                FROM inn_res ir, json_tree(result_score) as tr
                JOIN scoring_model_inns smi 
                ON smi.innres_id = ir.id 
                JOIN scoring_model sm 
                ON sm.id = smi.scoringmodel_id 
                JOIN imported_attributes ia 
                ON ia.inn = ir.inn
                WHERE tr.key is not null 
                AND typeof(tr.key) != 'integer'
                {where_data}
                {where_model_id}
                {where_user_id}
                ORDER BY smi.scoringmodel_id;
            """
        
        cursor.execute(text_query)
        data = cursor.fetchall()
        df = pd.DataFrame(data, columns=columns).fillna('')

        list_models = df['id модели'].unique()
        list_date = df['Дата сведений'].unique()
        list_users = df['Пользователь'].unique()

        with xlsxwriter.Workbook(filename) as writer:
            cell_format_header = writer.add_format({'bold': True, 'align': 'center', 'border':1, 'text_wrap': True})
            for row_model in list_models:
                for row_user in list_users:
                    for row_date in list_date:

                        name_model = df.loc[df['id модели']==row_model, 'Модель'].iloc[0]

                        name_sheet = f'{name_model}_{row_date}'.replace(':','_').replace(':','_')[:30]
                        worksheet = writer.add_worksheet(name_sheet)

                        worksheet.merge_range('A1:A2', 'Наименование организации', cell_format_header)
                        worksheet.merge_range('B1:B2', 'Дата сведений', cell_format_header)
                        worksheet.merge_range('C1:C2', 'ИНН', cell_format_header)
                        worksheet.merge_range('D1:D2', 'Итоговый результат', cell_format_header)
                        
                        df_markers = df.loc[df['id модели']==row_model]
                        df_markers = df_markers.loc[df_markers['Дата сведений']==row_date]
                        df_markers = df_markers.loc[df_markers['Пользователь']==row_user]

                        first_row = True
                       
                        for num, inn in enumerate(df_markers['ИНН'].unique()):
                            
                            df_key_value = df_markers.loc[df['ИНН']==inn]
                            row_org = df_key_value.loc[df_key_value['Ключ']=='total_rank'].iloc[0]
                            
                            worksheet.write(num + 2, 0, row_org['Наименование организации'])
                            worksheet.write(num + 2, 1, str(row_org['Дата сведений']))
                            worksheet.write(num + 2, 2, f' {row_org["ИНН"]}')
                            worksheet.write(num + 2, 3, row_org['Значение'])
                            
                            worksheet.set_column(num + 2, 0, 18)
                            worksheet.set_column(num + 2, 1, 18)
                            worksheet.set_column(num + 2, 2, 18)
                            worksheet.set_column(num + 2, 3, 18)

                            for index in ['marker_name', 'target_value', 'value']:
                                count_target_row = num + 2
                                count_target_col = 4
                                
                                df_value = df_key_value.loc[df_key_value['Ключ']==index]

                                for ind in df_value.index:
                                    row_value = df_value.loc[ind]
                                    
                                    # Заголовок
                                    if index == 'marker_name':
                                        if first_row:
                                            worksheet.merge_range(0, count_target_col, 0, count_target_col + 1, str(row_value['Значение']), cell_format_header) 
                                            worksheet.write(1, count_target_col, 'Значение', cell_format_header) 
                                            worksheet.write(1, count_target_col + 1, 'Результат', cell_format_header) 
                                    else:
                                        if index == 'target_value':
                                            worksheet.write(count_target_row, count_target_col, str(row_value['Значение']))
                                        else:
                                            worksheet.write(count_target_row, count_target_col + 1, str(row_value['Значение']))
                                        worksheet.set_column(count_target_row, count_target_col + 1, 18)

                                    count_target_col += 2
                            first_row = False

        response = FileResponse(open(filename, 'rb'), status=status.HTTP_200_OK)
        return response

### CRM VIEWS ###########################################################################################

#----------------
# СПРАВОЧНИКИ

@api_view(['GET'])
def ManagerViewSet(request):
    if request.method == 'GET':
        managers = Manager.objects.all().order_by('id')
        serializer = ManagerSerializer(
                managers,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def RegionViewSet(request):
    if request.method == 'GET':
        regions = Region.objects.all().order_by('id')
        serializer = RegionSerializer(
                regions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def SupportMeasureViewSet(request):
    if request.method == 'GET':
        supp_measure = SupportMeasure.objects.all().order_by('id')
        serializer = SupportMeasureSerializer(
                supp_measure,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def ReviewStageViewSet(request):
    if request.method == 'GET':
        review_stage = ReviewStage.objects.all().order_by('id')
        serializer = ReviewStageSerializer(
                review_stage,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def DebtTypeViewSet(request):
    if request.method == 'GET':
        dept_type = DebtType.objects.all().order_by('id')
        serializer = DebtTypeSerializer(
                dept_type,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def CategoryViewSet(request):
    if request.method == 'GET':
        categories = Category.objects.all().order_by('id')
        serializer = CategorySerializer(
                categories,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def ApplicantStatusViewSet(request):
    if request.method == 'GET':
        app_status = ApplicantStatus.objects.all().order_by('id')
        serializer = ApplicantStatusSerializer(
                app_status,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def InformationSourceTypeViewSet(request):
    if request.method == 'GET':
        info_source_types = InformationSourceType.objects.all().order_by('id')
        serializer = InformationSourceTypeSerializer(
                info_source_types,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def PositiveDecisionViewSet(request):
    if request.method == 'GET':
        pos_decisions = PositiveDecision.objects.all().order_by('id')
        serializer = PositiveDecisionSerializer(
                pos_decisions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def NegativeDecisionViewSet(request):
    if request.method == 'GET':
        neg_decisions = NegativeDecision.objects.all().order_by('id')
        serializer = NegativeDecisionSerializer(
                neg_decisions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def FieldsOfPositiveDecisionsViewSet(request, pk):
    if request.method == 'GET':
        fields = FieldsOfPositiveDecisions.objects.filter(positive_decision=PositiveDecision.objects.get(id=pk)).order_by('id')
        serializer = FieldsOfPositiveDecisionsSerializer(
                fields,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def PrdCatalogFieldsViewSet(request):
    if request.method == 'GET':
        prd_fields = CatalogPRD.objects.all().order_by('id')
        serializer = CatalogPRDSerializer(
                prd_fields,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def ReasonsForConsiderationViewSet(request):
    if request.method == 'GET':
        reasons_fields = ReasonsForConsideration.objects.all().order_by('id')
        serializer = ReasonsForConsiderationSerializer(
                reasons_fields,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})
#---------------------

#---------------------
# MAIN

@api_view(['GET'])
def ClientRepresentativeViewSet(request):
    if request.method == 'GET':
        neg_decisions = ClientRepresentative.objects.all().order_by('id')
        serializer = ClientRepresentativeSerializer(
                neg_decisions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})
    

@api_view(['GET'])
def InformationSourceViewSet(request):
    if request.method == 'GET':
        neg_decisions = InformationSource.objects.all().order_by('id')
        serializer = InformationSourceSerializer(
                neg_decisions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def ComplianceCriteriaViewSet(request):
    if request.method == 'GET':
        neg_decisions = ComplianceCriteria.objects.all().order_by('id')
        serializer = ComplianceCriteriaSerializer(
                neg_decisions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def KPIViewSet(request):
    if request.method == 'GET':
        neg_decisions = KPI.objects.all().order_by('id')
        serializer = KPISerializer(
                neg_decisions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET'])
def ClientViewSet(request):
    if request.method == 'GET':
        neg_decisions = Client.objects.all().order_by('id')
        serializer = ClientSerializer(
                neg_decisions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['POST'])
def CreateRelationClient(request):
    if request.method == 'POST':

        with transaction.atomic():
            try:
                region = Region.objects.get(id=request.data.get('region_id')) # Required
                
                if request.data.get('reasons') != "":
                    reasons = ReasonsForConsideration.objects.get(id=request.data.get('reasons'))  # string, "" -ok
                else:
                    reasons = None 

                if request.data.get('manager_id') != "":
                    manager = Manager.objects.get(id=request.data.get('manager_id'))
                else:
                    manager = None
                if request.data.get('stage_review') != "":
                    stage_review = ReviewStage.objects.get(id=request.data.get('stage_review'))
                else:
                    stage_review = None

                applicant_status = ApplicantStatus.objects.get(id=request.data.get('applicant_status')) # Required
                prd_catalog = CatalogPRD.objects.get(id=request.data.get('prd_catalog_id')) # Required

                serializer_body = ClientRepresentativeSerializer(data=request.data.get('representitive_client_id')) # All string fields
                if not serializer_body.is_valid():
                    transaction.set_rollback(True)
                    return Response(serializer_body.errors, status=status.HTTP_400_BAD_REQUEST)
                serializer_body.save()
                representitive_client_id = ClientRepresentative.objects.latest('id').id
            
                category = Category.objects.get(id=request.data.get('compliance_data_id')["category"]) # Required
                debt_type = DebtType.objects.get(id=request.data.get('compliance_data_id')["debt_type"]) # Required
                support_measure = SupportMeasure.objects.get(id=request.data.get('compliance_data_id')["support_measure"]) # Required

                if request.data.get('compliance_data_id')["support_duration"] != "":
                    support_duration = request.data.get('compliance_data_id')["support_duration"]
                else:
                    support_duration = None
                
                ComplianceCriteria.objects.create(
                    debt_amount = request.data.get('compliance_data_id')["debt_amount"], # Required
                    debt_type = debt_type,
                    category = category,
                    support_measure = support_measure,
                    note = request.data.get('compliance_data_id')["note"],
                    support_duration = support_duration,
                )
                compliance_criteria_id = ComplianceCriteria.objects.latest('id').id
                
                # print("request.data.get('information_source_id')[info_source_type_id]", request.data.get('information_source_id')["info_source_type_id"])
                # print(type(request.data.get('information_source_id')["info_source_type_id"]))
                if request.data.get('information_source_id')["info_source_type_id"] != "":
                    info_source_type_id = InformationSourceType.objects.get(id=request.data.get('information_source_id')["info_source_type_id"])
                else:
                    info_source_type_id = None

                if request.data.get('information_source_id')["info_source_date"] != "":
                    info_source_date = request.data.get('information_source_id')["info_source_date"]
                else:
                    info_source_date = None

                if request.data.get('information_source_id')["info_source_number"] != "":
                    info_source_number = request.data.get('information_source_id')["info_source_number"]
                else:
                    info_source_number = None
                    
                # InformationSource.objects.create(
                #     info_source_type = info_source_type_id,
                #     info_source_date = info_source_date,
                #     info_source_number = info_source_number,
                # )
                #TODO услвоие на не созданиии записи
                if ( info_source_number) or ( info_source_type_id) or ( info_source_date):
                    InformationSource.objects.create(
                        info_source_type = info_source_type_id,
                        info_source_date = info_source_date,
                        info_source_number = info_source_number,
                    )
                    information_source_id = InformationSource.objects.latest('id').id 
                else:
                    information_source_id = None

                # TODO Предусмотреть возможность создание kpi при не всех заполненных полях ################
                kpi_id = None
                if request.data.get('kpi_id') != None:
                    if request.data.get('kpi_id')["positive_decision_type"] != "":
                        positive_decision_type = request.data.get('kpi_id')["positive_decision_type"]
                    else: 
                        positive_decision_type = None
                    
                    if request.data.get('kpi_id')["positive_decision_date"] != "":
                        positive_decision_date = request.data.get('kpi_id')["positive_decision_date"]
                    else: 
                        positive_decision_date = None

                    if request.data.get('kpi_id')["measure_provided_duration"] != "":
                        measure_provided_duration = request.data.get('kpi_id')["measure_provided_duration"]
                    else: 
                        measure_provided_duration = None 
                    
                    if request.data.get('kpi_id')["negative_decision_type"] != "":
                        # negative_decision_type = request.data.get('kpi_id')["negative_decision_type"]
                        negative_decision_type = NegativeDecision.objects.get(id=request.data.get('kpi_id')["negative_decision_type"])
                        # print(negative_decision_type)
                        # print(type(negative_decision_type))
                    else: 
                        negative_decision_type = None 

                    if request.data.get('kpi_id')["settled_debt_amount"] != "":
                        settled_debt_amount = request.data.get('kpi_id')["settled_debt_amount"]
                    else: 
                        settled_debt_amount = None 

                    if request.data.get('kpi_id')["received_amount_budget"] != "":
                        received_amount_budget = request.data.get('kpi_id')["received_amount_budget"]
                    else: 
                        received_amount_budget = None 

                    if request.data.get('kpi_id')["overdue_debt_amount"] != "":
                        overdue_debt_amount = request.data.get('kpi_id')["overdue_debt_amount"]
                    else: 
                        overdue_debt_amount = None 

                    if request.data.get('kpi_id')["technical_overdue_debt_amount"] != "":
                        technical_overdue_debt_amount = request.data.get('kpi_id')["technical_overdue_debt_amount"]
                    else: 
                        technical_overdue_debt_amount = None 

                    if ( positive_decision_type) or ( positive_decision_date) or \
                    ( measure_provided_duration) or ( negative_decision_type) or \
                    ( settled_debt_amount) or ( received_amount_budget) or \
                    ( overdue_debt_amount) or ( technical_overdue_debt_amount):
                        KPI.objects.create(
                            positive_decision_type = positive_decision_type,
                            positive_decision_date = positive_decision_date,
                            measure_provided_duration = measure_provided_duration,
                            oiv_request_sender = request.data.get('kpi_id')["oiv_request_sender"],
                            negative_decision_type = negative_decision_type,
                            settled_debt_amount = settled_debt_amount,
                            received_amount_budget = received_amount_budget,
                            overdue_debt_amount = overdue_debt_amount,
                            technical_overdue_debt_amount = technical_overdue_debt_amount
                        )
                        kpi_id = KPI.objects.latest('id').id

                        if request.data.get('fields_of_positive_decision') != None and \
                            request.data.get('kpi_id')['positive_decision_type'] != None:
                            data_fields = request.data.get('fields_of_positive_decision')
                            for fields in data_fields:
                                fields['kpi'] = kpi_id
                                serializer_fields_of_positive = KpiPositiveDecisionFieldsSerializer(data=fields)
                                if not serializer_fields_of_positive.is_valid():
                                    transaction.set_rollback(True)
                                    return Response(serializer_body.errors, status=status.HTTP_400_BAD_REQUEST)
                            
                                serializer_fields_of_positive.save()

                    else:
                        kpi_id = None

                # if request.data.get('kpi_id') != None:
                #     serializer_kpi = KPISerializer(data=request.data.get('kpi_id'))
                #     if not serializer_kpi.is_valid():
                #         transaction.set_rollback(True)
                #         return Response(serializer_body.errors, 
                #                         status=status.HTTP_400_BAD_REQUEST)
                    
                #     serializer_kpi.save()
                    

                #     kpi_id = KPI.objects.latest('id').id
                    ########################################################################################

                    # if request.data.get('fields_of_positive_decision') != None and \
                    #     request.data.get('kpi_id')['positive_decision_type'] != None:
                    #     data_fields = request.data.get('fields_of_positive_decision')
                    #     for fields in data_fields:
                    #         fields['kpi'] = kpi_id
                    #         serializer_fields_of_positive = KpiPositiveDecisionFieldsSerializer(data=fields)
                    #         if not serializer_fields_of_positive.is_valid():
                    #             transaction.set_rollback(True)
                    #             return Response(serializer_body.errors, status=status.HTTP_400_BAD_REQUEST)
                        
                    #         serializer_fields_of_positive.save()

                if request.data.get('first_meeting_date') != "":
                    first_meeting_date = request.data.get('first_meeting_date')
                else:
                    first_meeting_date = None

                Client.objects.create(
                    first_name = request.data.get('first_name'), # string, "" -ok
                    second_name = request.data.get('second_name'), # string, "" -ok
                    patronymic = request.data.get('patronymic'), # string, "" -ok
                    inn = request.data.get('inn'), # Required
                    region = region,
                    manager = manager,
                    applicant_status = applicant_status,
                    information_source_id = information_source_id,
                    representitive_client_id = representitive_client_id,
                    compliance_criteria_id = compliance_criteria_id,
                    first_meeting_date = first_meeting_date,
                    prd_catalog = prd_catalog,
                    event_date = request.data.get('event_date'), # Required
                    event_description = request.data.get('event_description'), # Required
                    kpi_id = kpi_id,
                    stage_review = stage_review,
                    reasons = reasons
                )
            except Exception as e:
                return Response({'message': 'Некорректный ввод данных!', 'error': f"{e}"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'message': 'Клиент создан'}, status=status.HTTP_200_OK)
    return Response({'message': 'Метод не найден'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def DetailRelationClient(request, pk):
    if request.method == 'GET':

        client = Client.objects.get(id=pk)
        client_data = ClientSerializer(client)
        print(client)

        fields_of_positive_decision = None
        if (client.kpi != None):
            # Если тип не выбран, то и полей нет
            if client.kpi.positive_decision_type != None :
                fields_of_positive_decision = KpiPositiveDecisionFieldsSerializer(KpiPositiveDecisionFields.objects.filter(kpi=client.kpi.id), many=True)

        data = {}
        data.update(client_data.data)
        print(data)
        if fields_of_positive_decision != None:
            data['fields_of_positive_decision'] = fields_of_positive_decision.data
        else:
            data['fields_of_positive_decision'] = []

        return Response({'data': data}, status=status.HTTP_200_OK)
        
    return Response({'message': 'Метод не найден'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def UpdateRelationClient(request, pk):
    if request.method == 'POST':

        with transaction.atomic():
            try:

                region = Region.objects.get(id=request.data.get('region_id')) # Required
                if request.data.get('reasons') != "":
                    reasons = ReasonsForConsideration.objects.get(id=request.data.get('reasons'))  # string, "" -ok
                else:
                    reasons = None

                # manager = Manager.objects.get(id=request.data.get('manager_id'))
                if request.data.get('manager_id') != "":
                    manager = Manager.objects.get(id=request.data.get('manager_id'))
                else:
                    manager = None
                
                applicant_status = ApplicantStatus.objects.get(id=request.data.get('applicant_status')) # Required
                stage_review = ReviewStage.objects.get(id=request.data.get('stage_review')) # string, "" -ok
                prd_catalog = CatalogPRD.objects.get(id=request.data.get('prd_catalog_id')) # Required

                client = ClientRepresentative.objects.get(id=request.data.get('representitive_client_id')['id']) # All string fields
                serializer_body = ClientRepresentativeSerializer(instance=client, \
                                                                 data=request.data.get('representitive_client_id'))
                if not serializer_body.is_valid():
                    transaction.set_rollback(True)
                    return Response(serializer_body.errors, status=status.HTTP_400_BAD_REQUEST)
                serializer_body.save()
                
                # representitive_client_id = ClientRepresentative.objects.latest('id').id
            
                category = Category.objects.get(id=request.data.get('compliance_data_id')["category"]) # Required
                debt_type = DebtType.objects.get(id=request.data.get('compliance_data_id')["debt_type"]) # Required
                support_measure = SupportMeasure.objects.get(id=request.data.get('compliance_data_id')["support_measure"]) # Required

                if request.data.get('compliance_data_id')["support_duration"] != "":
                    support_duration = request.data.get('compliance_data_id')["support_duration"]
                else:
                    support_duration = None
                
                ComplianceCriteria.objects.filter(id=request.data.get('compliance_data_id')['id']).update(
                    debt_amount = request.data.get('compliance_data_id')["debt_amount"], # Required
                    debt_type = debt_type,
                    category = category,
                    support_measure = support_measure,
                    note = request.data.get('compliance_data_id')["note"],
                    support_duration = support_duration,
                )
                # compliance_criteria_id = ComplianceCriteria.objects.latest('id').id
                
                info_source_type_id = InformationSourceType.objects.get(id=request.data.get('information_source_id')["info_source_type_id"])
                
                InformationSource.objects.filter(id=request.data.get('information_source_id')['id']).update(
                    info_source_type = info_source_type_id,
                    info_source_date = request.data.get('information_source_id')["info_source_date"],
                    info_source_number = request.data.get('information_source_id')["info_source_number"],
                )
                # information_source_id = InformationSource.objects.latest('id').id 
                
                kpi_id = None
                if request.data.get('kpi_id') != None:
                    serializer_kpi = KPISerializer(instance=KPI.objects.get(id=request.data.get('kpi_id')['id']), data=request.data.get('kpi_id'))
                    if not serializer_kpi.is_valid():
                        transaction.set_rollback(True)
                        return Response(serializer_body.errors, status=status.HTTP_400_BAD_REQUEST)
            
                    serializer_kpi.save()
                    

                    kpi_id = KPI.objects.latest('id').id

                    KpiPositiveDecisionFields.objects.filter(kpi=kpi_id).delete()

                    if request.data.get('fields_of_positive_decision') != None and \
                        request.data.get('kpi_id')['positive_decision_type'] != None:
                        data_fields = request.data.get('fields_of_positive_decision')
                        for fields in data_fields:
                            fields['kpi'] = kpi_id
                            serializer_fields_of_positive = KpiPositiveDecisionFieldsSerializer(data=fields)
                            if not serializer_fields_of_positive.is_valid():
                                transaction.set_rollback(True)
                                return Response(serializer_body.errors, status=status.HTTP_400_BAD_REQUEST)
                        
                            serializer_fields_of_positive.save()

                if request.data.get('first_meeting_date') != "":
                    first_meeting_date = request.data.get('first_meeting_date')
                else:
                    first_meeting_date = None
                
                Client.objects.filter(id=request.data.get('id')).update(
                    first_name = request.data.get('first_name'), # string, "" -ok
                    second_name = request.data.get('second_name'), # string, "" -ok
                    patronymic = request.data.get('patronymic'), # string, "" -ok
                    inn = request.data.get('inn'), # Required
                    region = region,
                    manager = manager,
                    applicant_status = applicant_status,
                    # information_source_id = information_source_id,
                    # representitive_client_id = representitive_client_id,
                    # compliance_criteria_id = compliance_criteria_id,
                    first_meeting_date = first_meeting_date,
                    event_date = request.data.get('event_date'), # Required
                    event_description = request.data.get('event_description'), # Required
                    # kpi_id = kpi_id,
                    stage_review = stage_review,
                    prd_catalog = prd_catalog,
                    reasons = reasons,
                )
            except:
                return Response({'message': 'Некорректный ввод данных!'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'message': 'Клиент обновлен'}, status=status.HTTP_200_OK)
    return Response({'message': 'Метод не найден'}, status=status.HTTP_400_BAD_REQUEST)
#---------------------


@api_view(['GET'])
def import_db_to_file(request):

    #Созданим уникальны идентификатор для нашей таблицы и файла
    guid = 'file_db_import_' + uuid.uuid4().hex

    #Создадим дирректорию для хранения файлов
    dir_name = 'statistic_files'
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)

    columns = get_columns_to_query()
    column_merge = ['B', 'C', 'D', 'E', 'F', 'G', 'P', 'Q', 'R', 'S', 'T', 'U', 'AF']
    column_merg_ind = [0, 1, 2, 3, 4, 5, 14, 15, 16, 17, 18, 19, 30]

    # Устанавливаем соединение с базой данных
    with connection.cursor() as cursor:

        text_query = get_query_to_import()
        cursor.execute(text_query)
        data = cursor.fetchall()

        df = pd.DataFrame(data, columns=columns).fillna('')
        df = pd.concat([pd.Series([i for i in range(1, len(data)+1)], name='п/п'), df], axis=1)

        #Создадим excel
        filename = f'{dir_name}/{guid}.xlsx'
        with pd.ExcelWriter(filename, engine='xlsxwriter') as writer:
            df.to_excel(writer, sheet_name='Выгрузка', index=False, startrow=3, header=False)
            sheet = writer.sheets['Выгрузка']

            cell_format_header = writer.book.add_format({'bold': True, 'align': 'center', 'border':1, 'text_wrap': True})

            sheet.merge_range('A1:E1', 'Общие сведения', cell_format_header)
            sheet.merge_range('F1:O1', 'Первичные учетные данные (+)', cell_format_header)
            sheet.merge_range('P1:U1', 'Критерии соответствия клиентским требованиям (маркеры) (+)', cell_format_header)
            sheet.merge_range('V1:X1', 'Согласительные мероприятия (+)', cell_format_header)
            sheet.merge_range('Y1:AO1', 'Ключевые показатели эффективности (KPI) (+)', cell_format_header)

            sheet.merge_range('H2:J2', 'Источник информации', cell_format_header)
            sheet.merge_range('K2:N2', 'Представители клиента', cell_format_header)
            sheet.write('O2:O2', 'Контрольная точка', cell_format_header)
            sheet.merge_range('V2:X2', 'Контрольная точка', cell_format_header)
            sheet.merge_range('Y2:AE2', 'Принятое решение', cell_format_header)
            sheet.merge_range('AG2:AH2', 'Просроченная задолженность', cell_format_header)
            sheet.write('AI2:AI2', 'Отлагательные меры', cell_format_header)
            sheet.write('AJ2:AJ2', 'Изменения сроков уплаты', cell_format_header)
            sheet.merge_range('AK2:AO2', 'Мировое соглашение (+)', cell_format_header)

            sheet.merge_range('A2:A3', 'п/п', cell_format_header)
            for i in range(0, len(columns[:-1])):
                if i in column_merg_ind:
                    sim = column_merge[column_merg_ind.index(i)]
                    sheet.merge_range(f'{sim}2:{sim}3', columns[i], cell_format_header)
                else:
                    sheet.write(2, i+1, columns[i], cell_format_header)
                cell_format = writer.book.add_format({'text_wrap': True})
                sheet.set_column(2, i+1, 18, cell_format)


            sheet.merge_range('AP1:AR2', 'Вид предоставляемого обеспечения', cell_format_header)
            # sheet.write('AP3:AP3', 'Залог имущества (в тыс. руб.)', cell_format_header)
            # sheet.write('AQ3:AQ3', 'Поручительство (в тыс. руб.)', cell_format_header)
            # sheet.write('AR3:AR3', 'Банковская гарантия (в тыс. руб.)', cell_format_header)
            sheet.merge_range('AS1:AS3', 'Стадия рассмотрения', cell_format_header)
            sheet.set_column('AS1:AS3', 25)
            sheet.merge_range('AT1:AV2', 'Проводимая работа в случае не исполнения предоставленной меры', cell_format_header)
            sheet.merge_range('AW1:BK1', 'Постконтроль по состоянию на  ________', cell_format_header)
            sheet.write('AT3:AT3', 'дата направления ДОЛЖНИКУ уведомления (претензии)', cell_format_header)
            sheet.write('AU3:AU3', 'дата направления ПОРУЧИТЕЛЮ уведомления (претензии)', cell_format_header)
            sheet.write('AV3:AV3', 'дата направления ЗАЛОГОДАТЕЛЮ уведомления (претензии)', cell_format_header)
            sheet.merge_range('AW2:AW3', 'выручка (КНД 1151006, год 2023, код периода-31, 40, стр.2_1_010 )', cell_format_header)
            sheet.merge_range('AX2:AX3', 'выручка (КНД 0710099, год 2022, стр.2110_4)', cell_format_header)
            sheet.merge_range('AY2:AY3', 'ССЧ ( КНД 1151111 , код периода -31 год 2023, стр.П023)', cell_format_header)
            sheet.merge_range('AZ2:AZ3', 'активы 2022 г. (КНД 0710099, год 2022, стр.1600_4 )', cell_format_header)
            sheet.merge_range('BA2:BA3', 'уплачено налогов 2023 г.( ИР РСБ)', cell_format_header)
            sheet.merge_range('BB2:BB3', 'стадия в процедуре банкротства ', cell_format_header)
            sheet.merge_range('BC2:BC3', 'сумма долга ЕНС ( ИР РСБ)', cell_format_header)
            sheet.merge_range('BD2:BD3', 'ФОТ (КНД 1151111, год 2023, код периода-31, стр. П716)', cell_format_header)
            sheet.merge_range('BE2:BE3', 'прибыль (КНД 1151006, год 2023,код периода-31, 40  стр.2_060)', cell_format_header)
            sheet.merge_range('BF2:BF3', 'Результаты скоринга платежеспособности ', cell_format_header)
            sheet.merge_range('BG2:BG3', 'из выписки СКУАД - текущая стоимость бизнеса', cell_format_header)
            sheet.merge_range('BH2:BH3', 'из выписки СКУАД -, ликвидационная стоимость бизнеса', cell_format_header)
            sheet.merge_range('BI2:BI3', 'из выписки СКУАД -  возвратность средств', cell_format_header)
            sheet.merge_range('BJ2:BJ3', 'из выписки СКУАД - потребность в оборотных средствах', cell_format_header)
            sheet.merge_range('BK2:BK3', 'ранг платёжеспособности', cell_format_header)

        #Создадим ответ из файла
        response = FileResponse(open(filename, 'rb'), status=status.HTTP_200_OK)

        return response


def get_columns_to_query():

    return ["Представительсво ПРД",
        "Менеджер площадки (из списка)", 
        "Наименование клиента",
        "ИНН",
        "Регион (из списка)",
        "Статус заявителя (из списка) (*)",
        "письмо / список / поручение",
        "дата",
        "номер",
        "ФИО",
        "должность",
        "телефон",
        "почта",
        "Дата регистрации обращения в МИУДОЛ",
        "Сумма задолженности (будущего долга) (в т.ч. пени, штрафы), тыс. руб.",
        "Тип долга (из списка)",
        "Категория (из списка)",
        "Мера поддержки (способ урегулирования), запрашиваемая клиентом (из списка) (*)",
        "Примечание к гр. 23", 
        "Срок на котрый необходимо предоставление меры, мес.",
        "Дата первой встречи",
        "Дата наступления события (*)",
        "Описание события (кратко)",
        "Вид положительного решения (из списка)",
        "ДАТА положительного решения",
        "На сколько предоставлена мера, в месяцах",
        "Основания и методика рассмотрения гл. 9 НК РФ",
        "От кого ходатайство ОИВ (для МС)",
        "Вид отрицательного решения (из списка)",
        "Сумма урегулированной задолженности, тыс. руб.",
        "Сумма поступившая в бюджет, тыс. руб.",
        "сумма, тыс. руб.",  
        "сумма технической просроченной задолженности, сумма, тыс. руб.",
        "Ближайший срок исполнения обязательства (до какого момента отложены меры)",
        "Не вступило в силу рассрочка/ отсрочка, тыс. руб.",
        "Номер дела",
        "Дата утверждения МС судом",
        "Сумма требований вошедших в МС, тыс. руб.",
        "Дата окончания МС",
        "Сумма исполненных обязательств, тыс. руб.",
        "Залог имущества (в тыс. руб.)",
        "Поручительство (в тыс. руб.)",
        "Банковская гарантия (в тыс. руб.)",
        "Стадия рассмотрения"  
    ]


def get_query_to_import():

    return """
SELECT 
--Общие сведения
    t_prd_catalog.catalog_prd as prd,
    t_manager.second_name || ' ' || t_manager.first_name || ' ' || t_manager.patronymic as manager,
    t_client.second_name || ' ' || t_client.first_name || ' ' || t_client.patronymic as client,
    t_client.inn as inn,
    --t_inn.inn as inn,
-- Первичные учетные данные
    t_region.region as region,
    t_status.status as status,
-- Источник информации
    t_inf_type.type as info_type,
    t_inf_sours.info_source_date as info_source_date,
    t_inf_sours.info_source_number as info_source_number,
-- Представители клиента
    t_repr_client.representative_second_name || ' ' || t_repr_client.representative_first_name || ' ' || t_repr_client.representative_patronymic as fio_repr_client,
    t_repr_client.representative_position as repr_position,
    t_repr_client.representative_phone as repr_phone,
    t_repr_client.representative_email as repr_email,
-- Контрольная точка
    t_repr_client.control_point as repr_control_point,
-- Критерии соответствия клиентским требованиям (маркеры) (+)					
    t_criteria.debt_amount as debt_amount,
    t_debt_type.type as debt_type,
    t_category.type as category,
    t_supp_measure.category_type as category_type,
    t_criteria.note as note,
    t_criteria.support_duration as support_duration,
-- Согласительные мероприятия (+)
    t_client.first_meeting_date as first_meeting_date,
    t_client.event_date as event_date,
    t_client.event_description as event_description,
-- Ключевые показатели эффективности (KPI) (+)															
-- Принятое решение
    t_pos_decision.positive_decision as positive_decision,
    t_kpi.positive_decision_date as positive_decision_date,
    t_kpi.measure_provided_duration as measure_provided_duration,
    '' as merodic,
    t_kpi.oiv_request_sender as oiv_request_sender,
    t_neg_decision.negative_decision as negative_decision,
    t_kpi.settled_debt_amount as settled_debt_amount,
    
    t_kpi.received_amount_budget as received_amount_budget,
-- Просроченная задолженность	
    t_kpi.overdue_debt_amount as overdue_debt_amount,
    t_kpi.technical_overdue_debt_amount as technical_overdue_debt_amount,
-- Отлагательные меры
    t_kpi_positive_decision_fields_1.value as nearest_deadline,
-- Изменения сроков уплаты
    t_kpi_positive_decision_fields_2.value as installment_plan,
-- Мировое соглашение (+)			
    t_kpi_positive_decision_fields_3.value as case_number,
    t_kpi_positive_decision_fields_4.value as date_of_approvall,
    t_kpi_positive_decision_fields_5.value as sum_of_the_claims,
    t_kpi_positive_decision_fields_6.value as end_date,
    t_kpi_positive_decision_fields_7.value as amount_of_fulfilled,  

    '' as pole1,
    '' as pole2,
    '' as pole3,

    --'' as stage
    t_review_stage.stage as stage

  FROM client as t_client
  LEFT JOIN manager as t_manager
  ON t_client.manager_id = t_manager.id
  LEFT JOIN inn_res as t_inn
  ON t_client.inn = t_inn.id
  LEFT JOIN region as t_region
  ON t_client.region_id = t_region.id
  LEFT JOIN appl_status as t_status
  ON t_client.applicant_status_id = t_status.id
  LEFT JOIN inform_source as t_inf_sours
  ON t_client.information_source_id = t_inf_sours.id
  LEFT JOIN inform_source_type as t_inf_type    
  ON t_inf_sours.info_source_type_id = t_inf_type.id
  LEFT JOIN client_representative as t_repr_client
  ON t_client.representitive_client_id = t_repr_client.id
  LEFT JOIN compliance_criteria as t_criteria
  ON t_client.compliance_criteria_id = t_criteria.id
  LEFT JOIN debt_type as t_debt_type
  ON t_criteria.debt_type_id = t_debt_type.id
  LEFT JOIN category as t_category
  ON t_criteria.category_id = t_category.id
  LEFT JOIN supp_measure as t_supp_measure
  ON t_criteria.support_measure_id = t_supp_measure.id
  LEFT JOIN kpi as t_kpi
  ON t_client.kpi_id = t_kpi.id
  LEFT JOIN pos_decision as t_pos_decision
  ON t_kpi.positive_decision_type_id = t_pos_decision.id
  LEFT JOIN neg_decision as t_neg_decision
  ON t_kpi.negative_decision_type_id = t_neg_decision.id
  -- Отлагательные меры
  LEFT JOIN positive_decision_fields as t_positive_decision_fields_1
  ON t_kpi.positive_decision_type_id = t_positive_decision_fields_1.positive_decision_id
  AND t_positive_decision_fields_1.origin = 'Ближайший срок исполнения обязательства'
  LEFT JOIN kpi_positive_decision_fields as t_kpi_positive_decision_fields_1
  ON t_kpi.id = t_kpi_positive_decision_fields_1.kpi_id
  AND t_kpi_positive_decision_fields_1.fields_of_pos_decision_id = t_positive_decision_fields_1.id
 -- Изменения сроков уплаты
 LEFT JOIN positive_decision_fields as t_positive_decision_fields_2
  ON t_kpi.positive_decision_type_id = t_positive_decision_fields_2.positive_decision_id
  AND t_positive_decision_fields_2.origin = 'Не вступило в силу рассрочка'
  LEFT JOIN kpi_positive_decision_fields as t_kpi_positive_decision_fields_2
  ON t_kpi.id = t_kpi_positive_decision_fields_2.kpi_id
  AND t_kpi_positive_decision_fields_2.fields_of_pos_decision_id = t_positive_decision_fields_2.id
 -- Мировое соглашение (+)				
 LEFT JOIN positive_decision_fields as t_positive_decision_fields_3
  ON t_kpi.positive_decision_type_id = t_positive_decision_fields_3.positive_decision_id
  AND t_positive_decision_fields_3.origin = 'Номер дела'
  LEFT JOIN kpi_positive_decision_fields as t_kpi_positive_decision_fields_3
  ON t_kpi.id = t_kpi_positive_decision_fields_3.kpi_id
  AND t_kpi_positive_decision_fields_3.fields_of_pos_decision_id = t_positive_decision_fields_3.id
  
 LEFT JOIN positive_decision_fields as t_positive_decision_fields_4
  ON t_kpi.positive_decision_type_id = t_positive_decision_fields_4.positive_decision_id
  AND t_positive_decision_fields_4.origin = 'Дата утверждения МС судом'
  LEFT JOIN kpi_positive_decision_fields as t_kpi_positive_decision_fields_4
  ON t_kpi.id = t_kpi_positive_decision_fields_4.kpi_id
  AND t_kpi_positive_decision_fields_4.fields_of_pos_decision_id = t_positive_decision_fields_4.id
  
 LEFT JOIN positive_decision_fields as t_positive_decision_fields_5
  ON t_kpi.positive_decision_type_id = t_positive_decision_fields_5.positive_decision_id
  AND t_positive_decision_fields_5.origin = 'Сумма требований вошедших в МС'
  LEFT JOIN kpi_positive_decision_fields as t_kpi_positive_decision_fields_5
  ON t_kpi.id = t_kpi_positive_decision_fields_5.kpi_id
  AND t_kpi_positive_decision_fields_5.fields_of_pos_decision_id = t_positive_decision_fields_5.id
  
 LEFT JOIN positive_decision_fields as t_positive_decision_fields_6
  ON t_kpi.positive_decision_type_id = t_positive_decision_fields_6.positive_decision_id
  AND t_positive_decision_fields_6.origin = 'Дата окончания МС'
  LEFT JOIN kpi_positive_decision_fields as t_kpi_positive_decision_fields_6
  ON t_kpi.id = t_kpi_positive_decision_fields_6.kpi_id
  AND t_kpi_positive_decision_fields_6.fields_of_pos_decision_id = t_positive_decision_fields_6.id
  
 LEFT JOIN positive_decision_fields as t_positive_decision_fields_7
  ON t_kpi.positive_decision_type_id = t_positive_decision_fields_7.positive_decision_id
  AND t_positive_decision_fields_7.origin = 'Сумма исполненных обязательств'
  LEFT JOIN kpi_positive_decision_fields as t_kpi_positive_decision_fields_7
  ON t_kpi.id = t_kpi_positive_decision_fields_7.kpi_id
  AND t_kpi_positive_decision_fields_7.fields_of_pos_decision_id = t_positive_decision_fields_7.id

  --ПРД каталог
 LEFT JOIN prd_catalog as t_prd_catalog
 ON t_client.prd_catalog_id = t_prd_catalog.id
 
  -- Стадия рассмотрения
 LEFT JOIN review_stage as t_review_stage
 ON t_client.stage_review_id = t_review_stage.id
"""