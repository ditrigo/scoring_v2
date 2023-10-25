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


# Uploaded files into DataBase
@api_view(['GET', 'POST'])
def FilesListViewSet(request):  # (viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    if request.method == 'GET':
        # data = []
        # nextPage = 1
        # previousPage = 1
        files = FileAttributes.objects.all().order_by('id')
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


def InsertValuesToCountedAttributes():

    def calculate_counted_attributes(csv_attributes):
        inn = csv_attributes.inn
        # print(inn)
        other_property = csv_attributes.s_1150_4 - csv_attributes.pru_cad_cost_amt - csv_attributes.lru_cad_cost_amt - csv_attributes.lru_cad_cost_amt_6monthago if csv_attributes.s_1150_4 - \
            csv_attributes.pru_cad_cost_amt - csv_attributes.lru_cad_cost_amt - csv_attributes.lru_cad_cost_amt_6monthago > 0 else 0
        # print(other_property)
        clr = csv_attributes.s_1500_4 - \
            csv_attributes.s_1530_4 if csv_attributes.s_1500_4 - \
            csv_attributes.s_1530_4 != 0 else 0
        # print(clr)
        solvency_ratio = csv_attributes.s_1200_4 / \
            (csv_attributes.s_1500_4 + csv_attributes.s_1400_4) if csv_attributes.s_1500_4 + \
            csv_attributes.s_1400_4 != 0 else 0
        # print(solvency_ratio)
        autonomy_ratio = csv_attributes.s_1300_4 / \
            csv_attributes.s_1600_4 if csv_attributes.s_1600_4 != 0 else 0
        # print(autonomy_ratio)
        perc_coverage_ratio = csv_attributes.s_2400_4 / \
            csv_attributes.s_2330_4 if csv_attributes.s_2330_4 != 0 else 0
        # print(perc_coverage_ratio)
        assets_return = csv_attributes.s_2400_4 / \
            csv_attributes.s_1600_4 if csv_attributes.s_1600_4 != 0 else 0
        # print(assets_return)
        dolg_in_balance = csv_attributes.dolg / \
            csv_attributes.s_1600_4 if csv_attributes.s_1600_4 != 0 else 0
        # print(dolg_in_balance)
        return_on_equity = csv_attributes.s_2400_4 / ((csv_attributes.s_1300_4 + csv_attributes.s_1300_5) / 2) * \
            100 if csv_attributes.s_1300_4 + csv_attributes.s_1300_5 != 0 else 0
        # print(return_on_equity)
        fin_leverage = (csv_attributes.s_1500_4 + csv_attributes.s_1400_4) / \
            csv_attributes.s_1300_4 if csv_attributes.s_1300_4 != 0 else 0
        # print(fin_leverage)
        dolg_ebit = (csv_attributes.s_1410_4 + csv_attributes.s_1510_4 - csv_attributes.s_1240_4 - csv_attributes.s_1250_4) / (csv_attributes.s_2110_4 - csv_attributes.s_2120_4 - csv_attributes.s_2210_4 - csv_attributes.s_2220_4 + csv_attributes.s_2310_4 + csv_attributes.s_2320_4 +
                                                                                                                               csv_attributes.s_2340_4 - csv_attributes.s_2350_4) if (csv_attributes.s_2110_4 - csv_attributes.s_2120_4 - csv_attributes.s_2210_4 - csv_attributes.s_2220_4 + csv_attributes.s_2310_4 + csv_attributes.s_2320_4 + csv_attributes.s_2340_4 - csv_attributes.s_2350_4) != 0 else 0
        # print("dolg_ebit", dolg_ebit)
        turnover = csv_attributes.s_2110_4 / \
            ((csv_attributes.s_1600_4 + csv_attributes.s_1600_5) /
             2) if csv_attributes.s_1600_4 + csv_attributes.s_1600_5 != 0 else 0
        # print(turnover)
        turnover_in_credit = (csv_attributes.s_1520_4 + csv_attributes.s_1520_5) / (csv_attributes.s_1230_4 +
                                                                                    csv_attributes.s_1230_5) if csv_attributes.s_1230_4 + csv_attributes.s_1230_5 != 0 else 0
        # print(turnover_in_credit)
        repay_fund = (csv_attributes.account_balance_SKUAD + csv_attributes.pru_cad_cost_amt + csv_attributes.lru_cad_cost_amt - csv_attributes.cad_cost_amt_inpledge +
                      csv_attributes.s_1230_4 * 0.0861 + csv_attributes.ts_cad_cost_amt + other_property) / (csv_attributes.s_1520_4 * 1.069) if csv_attributes.s_1520_4 != 0 else 0
        # print(repay_fund)
        invest_coverage_ratio = (csv_attributes.s_1300_4 + csv_attributes.s_1400_4) / \
            csv_attributes.s_1600_4 if csv_attributes.s_1600_4 != 0 else 0
        # print(invest_coverage_ratio)
        equity_capital_ratio = (csv_attributes.s_1300_4 - csv_attributes.s_1100_4) / \
            csv_attributes.s_1200_4 if csv_attributes.s_1200_4 != 0 else 0
        # print(equity_capital_ratio)
        stock_avail_ration = (csv_attributes.s_1300_4 - csv_attributes.s_1100_4) / \
            csv_attributes.s_1210_4 if csv_attributes.s_1210_4 != 0 else 0
        # print(stock_avail_ration)
        quick_liquid_ratio = (csv_attributes.s_1230_4 + csv_attributes.s_1240_4 + csv_attributes.s_1250_4) / \
            csv_attributes.s_1210_4 if csv_attributes.s_1500_4 != 0 else 0
        # print(quick_liquid_ratio)
        asset_dinam_1 = csv_attributes.s_1600_4 - csv_attributes.s_1600_5
        # print(asset_dinam_1)
        asset_dinam_2 = csv_attributes.s_1600_5 - csv_attributes.s_1600_4_2yearago
        # print(asset_dinam_2)
        asset_dinam_3 = csv_attributes.s_1600_4_2yearago - csv_attributes.s_1600_5_2yearago
        # print("asset_dinam_3", asset_dinam_3)
        profit_dinam_1 = csv_attributes.s_2400_4 - csv_attributes.s_2400_5
        # print(profit_dinam_1)
        profit_dinam_2 = csv_attributes.s_2400_5 - csv_attributes.s_2400_4
        # print(profit_dinam_2)
        profit_dinam_3 = csv_attributes.s_2400_4 - csv_attributes.s_2400_5_2yearago
        # print(profit_dinam_3)
        k_5_154 = csv_attributes.s_1200_4 / \
            csv_attributes.s_1500_4 if csv_attributes.s_1500_4 != 0 else 0
        # print(k_5_154)
        k_6_155 = csv_attributes.s_1300_4 / (csv_attributes.s_1510_4 + csv_attributes.s_1400_4 + csv_attributes.s_1550_4 +
                                             csv_attributes.s_1520_4) if csv_attributes.s_1510_4 + csv_attributes.s_1400_4 + csv_attributes.s_1550_4 + csv_attributes.s_1520_4 != 0 else 0
        # print(k_6_155)
        k_7_156 = (csv_attributes.s_2400_4 + csv_attributes.s_2330_4 + csv_attributes.s_2410_4) / \
            csv_attributes.s_2330_4 if csv_attributes.s_2330_4 != 0 else 0
        # print(k_7_156)
        k_8_157 = csv_attributes.s_2200_4 / \
            csv_attributes.s_1100_4 if csv_attributes.s_1100_4 != 0 else 0
        # print(k_8_157)
        k_9_158 = csv_attributes.s_1300_4 / \
            csv_attributes.s_1600_4 if csv_attributes.s_1600_4 != 0 else 0
        # print(k_9_158)
        k_10_159 = (csv_attributes.s_1400_4 + csv_attributes.s_1500_4) / \
            csv_attributes.s_1300_4 if csv_attributes.s_1300_4 != 0 else 0
        # print(k_10_159)
        property_sum = csv_attributes.pru_cad_cost_amt + \
            csv_attributes.lru_cad_cost_amt + csv_attributes.ts_cad_cost_amt
        # print("property_sum ", property_sum)
        k_1_161 = (csv_attributes.enforce_ntfinish_sum_wthtax + csv_attributes.dolg) * \
            100 / csv_attributes.s_1520_4 - 100 if csv_attributes.s_1520_4 != 0 else 0
        # print(k_1_161)
        k_2_162 = csv_attributes.s_1210_4 * 100 / csv_attributes.s_1150_4 - \
            100 if csv_attributes.s_1150_4 != 0 else 0
        # print("k_2_162", k_2_162)
        k_3_163 = (csv_attributes.npo_2_010_year + csv_attributes.npo_4_010 + csv_attributes.npo_5_060) * \
            100 / csv_attributes.s_2110_4 - 100 if csv_attributes.s_2110_4 != 0 else 0
        # print("k_3_163", k_3_163)
        k_4_164 = 100 if (csv_attributes.s_1510_4 + csv_attributes.s_1410_4) == 0 and csv_attributes.cad_cost_amt_inpledge > 0 else (
            csv_attributes.cad_cost_amt_inpledge * 100 / (csv_attributes.s_1510_4 + csv_attributes.s_1410_4) - 100)
        # print("k_4_164", k_4_164)
        revenue_dinam = 100 if csv_attributes.npo_2_020_thisyear > 0 and csv_attributes.npo_2_020_lastyear != 0 else (
            (csv_attributes.npo_2_020_thisyear - csv_attributes.npo_2_020_lastyear) * 100 / csv_attributes.npo_2_020_lastyear - 100) if csv_attributes.npo_2_020_lastyear != 0 else 0
        # print("revenue_dinam ", revenue_dinam)
        # print(f"""account_balance_SKUAD {csv_attributes.account_balance_SKUAD}\nproperty_sum{property_sum}\ns_1230_4{csv_attributes.s_1230_4}
        #         \nother_property{other_property}\ns_1210_4{csv_attributes.s_1210_4}\nnpo_2_060_year{csv_attributes.npo_2_060_year}
        #         \nstcontract_amount{csv_attributes.stcontract_amount}\ndolg{csv_attributes.dolg}\nrazryv_1stlink_sum{csv_attributes.razryv_1stlink_sum}\nenforce_ntfinish_sum_wthtax{csv_attributes.enforce_ntfinish_sum_wthtax}"""
        #       )
        
        current_business_value = (csv_attributes.account_balance_SKUAD + property_sum + csv_attributes.s_1230_4 * 0.0861 + other_property + csv_attributes.s_1210_4 +
                                  csv_attributes.npo_2_060_year + csv_attributes.stcontract_amount - csv_attributes.dolg - csv_attributes.razryv_1stlink_sum - csv_attributes.enforce_ntfinish_sum_wthtax) / 1000000
        # print(current_business_value)
        # print(csv_attributes.account_balance_SKUAD, 
            #   property_sum, csv_attributes.s_1230_4, 
            #   other_property, csv_attributes.s_1210_4, 
            #   csv_attributes.npo_2_060_year,
            #   csv_attributes.stcontract_amount, 
            #   csv_attributes.dolg, 
            #   csv_attributes.razryv_1stlink_sum,
            #   csv_attributes.enforce_ntfinish_sum_wthtax)
        
        liquid_business_value = ((csv_attributes.pru_cad_cost_amt + csv_attributes.lru_cad_cost_amt + csv_attributes.ts_cad_cost_amt)
                                 * 0.2 + csv_attributes.s_1230_4 * 0.0861 + other_property * 0.2) / 1000000
        # print(liquid_business_value)
        repay_fund_lender = ((csv_attributes.account_balance_SKUAD + (csv_attributes.pru_cad_cost_amt + csv_attributes.lru_cad_cost_amt + csv_attributes.ts_cad_cost_amt) * 0.2 + csv_attributes.s_1230_4 * 0.0861 +
                              other_property * 0.2) * 100) / (csv_attributes.s_1500_4 + csv_attributes.s_1400_4 + csv_attributes.dolg) if (csv_attributes.s_1500_4 + csv_attributes.s_1400_4 + csv_attributes.dolg) != 0 else 0
        # print(repay_fund_lender)
        need_capital = ((csv_attributes.s_1300_5 / csv_attributes.s_1300_4) / 1000000 - csv_attributes.s_1300_4 / 1000000) if csv_attributes.s_1300_4 != 0 and (
            (csv_attributes.s_1300_5 / csv_attributes.s_1300_4) < 0 or (csv_attributes.s_1300_5 / csv_attributes.s_1300_4) > 3) else 0
        # print(need_capital)
        need_capital_dp = ((csv_attributes.s_1410_4 / csv_attributes.s_1300_4) / 1000000 - csv_attributes.s_1300_4 / 1000000) if csv_attributes.s_1300_4 != 0 and (
            (csv_attributes.s_1410_4 / csv_attributes.s_1300_4) < 0 or (csv_attributes.s_1410_4 / csv_attributes.s_1300_4) > 3) else 0
        # print(need_capital_dp)
        ebitda = csv_attributes.npo_2_010_year + csv_attributes.npo_2_020_year - \
            csv_attributes.npo_2_030_year - csv_attributes.npo_2_040_year
        # print(ebitda)
        dolg_score = csv_attributes.s_1520_4 + \
            csv_attributes.s_1450_4 + csv_attributes.s_1550_4
        # print(dolg_score)
        dolg_dp = csv_attributes.s_1410_4 + csv_attributes.s_1450_4 + \
            csv_attributes.s_1510_4 + csv_attributes.s_1520_4
        # print(dolg_dp)
        need_capital_rub = (csv_attributes.account_balance_SKUAD + property_sum + csv_attributes.s_1230_4 * 0.0861 + other_property + csv_attributes.s_1210_4 +
                            csv_attributes.npo_2_060_year + csv_attributes.stcontract_amount - csv_attributes.dolg - csv_attributes.razryv_1stlink_sum - csv_attributes.enforce_ntfinish_sum_wthtax) / 1000
        # print(need_capital_rub)
        need_capital_dp_rub = ((csv_attributes.pru_cad_cost_amt + csv_attributes.lru_cad_cost_amt + csv_attributes.ts_cad_cost_amt)
                               * 0.2 + csv_attributes.s_1230_4 * 0.0861 + other_property * 0.2) / 1000
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

    imported_attributes_list = ImportedAttributes.objects.all()

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
        
        if result.totals[RowResult.IMPORT_TYPE_NEW]:
            InsertValuesToCountedAttributes()

        os.remove("./media/store/"+str(filename.name))
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
        data = []
        nextPage = 1
        previousPage = 1
        fields = MainCatalog.objects.all().order_by('id')
        page = request.GET.get('page', 1)
        paginator = Paginator(fields, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = MainCatalogSerializer(
            data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                         'count': paginator.count,
                         'numpages': paginator.num_pages,
                         'nextlink': '/api/catalogs/?page=' + str(nextPage),
                         'prevlink': '/api/catalogs/?page=' + str(previousPage)})
    elif request.method == 'POST':
        serializer = MainCatalogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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
        attributes = MarkersAttributes.objects.all().order_by('id')
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
    

@api_view(['POST'])
def StartScoringViewSet(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        
        rank = 0.0 
        inn_list, marker_formula_list = [], []
        for key, value in data["model"].items():
            # print("key -", key,"\nvalue - ", value)
            # print('\n')
            if key == "inns":
                for val in value:
                    # print(val)
                    for k, v in val.items():
                        # print("inns.keys", k ,"inns.values", v)
                        if k == "inn":
                            inn_list.append(v)
            elif key == "marker_id":
                for val in value:
                    # print(val)
                    for k, v in val.items():
                        # print("marker_id.keys", k ,"marker_id.values", v)
                        if k == "py_query":
                            marker_formula_list.append(v)
        
        # print(inn_list)
        # print(marker_formula_list)
        # print(CsvAttributes.objects.get(inn=inn_list[0]).np_name)

        dict_markers = {}
        list_markers = []
        for inn in inn_list:
            for formula in marker_formula_list:
                try:
                    imported_attributes = ImportedAttributes.objects.get(inn=inn)
                    counted_attributes = CountedAttributesNew.objects.get(inn=inn)
                except ImportedAttributes.DoesNotExist or CountedAttributesNew.DoesNotExist:
                    continue
                value = eval(formula)
                list_markers.append({'formula': formula, "value": value})
                
                rank += value
                print(value)
                # inn_res = InnRes.objects.filter(inn=inn).update(result_score=rank) 
                # inn_res.save()

            total_json = {
                "markers_and_values": list_markers,
                "total_rank": rank
            }
            dict_markers.update(total_json)
            print(dict_markers)
            InnRes.objects.filter(inn=inn).update(result_score=dict_markers) 
            # InnRes.objects.create(markers_json=dict_markers)
            dict_markers = {}

        return JsonResponse({'message': 'Results were updated '}, status=200)

    return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)



### CRM VIEWS ###########################################################################################

#----------------
# СПРАВОЧНИКИ

@api_view(['GET', 'POST'])
def ManagerViewSet(request):
    if request.method == 'GET':
        managers = Manager.objects.all().order_by('id')
        serializer = ManagerSerializer(
                managers,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET', 'POST'])
def RegionViewSet(request):
    if request.method == 'GET':
        regions = Region.objects.all().order_by('id')
        serializer = RegionSerializer(
                regions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET', 'POST'])
def SupportMeasureViewSet(request):
    if request.method == 'GET':
        supp_measure = SupportMeasure.objects.all().order_by('id')
        serializer = SupportMeasureSerializer(
                supp_measure,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET', 'POST'])
def ReviewStageViewSet(request):
    if request.method == 'GET':
        review_stage = ReviewStage.objects.all().order_by('id')
        serializer = ReviewStageSerializer(
                review_stage,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET', 'POST'])
def DebtTypeViewSet(request):
    if request.method == 'GET':
        dept_type = DebtType.objects.all().order_by('id')
        serializer = DebtTypeSerializer(
                dept_type,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET', 'POST'])
def CategoryViewSet(request):
    if request.method == 'GET':
        categories = Category.objects.all().order_by('id')
        serializer = CategorySerializer(
                categories,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET', 'POST'])
def ApplicantStatusViewSet(request):
    if request.method == 'GET':
        app_status = ApplicantStatus.objects.all().order_by('id')
        serializer = ApplicantStatusSerializer(
                app_status,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET', 'POST'])
def InformationSourceTypeViewSet(request):
    if request.method == 'GET':
        info_source_types = InformationSourceType.objects.all().order_by('id')
        serializer = InformationSourceTypeSerializer(
                info_source_types,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET', 'POST'])
def PositiveDecisionViewSet(request):
    if request.method == 'GET':
        pos_decisions = PositiveDecision.objects.all().order_by('id')
        serializer = PositiveDecisionSerializer(
                pos_decisions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})


@api_view(['GET', 'POST'])
def NegativeDecisionViewSet(request):
    if request.method == 'GET':
        neg_decisions = NegativeDecision.objects.all().order_by('id')
        serializer = NegativeDecisionSerializer(
                neg_decisions,
                context={'request': request}, 
                many=True
                )
        return Response({'data': serializer.data})
#---------------------