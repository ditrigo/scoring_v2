from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin, ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin
from .models import *
import pandas as pd
import numpy as np
import json
from tablib import Dataset


class ImportedAttributesResource(resources.ModelResource):
    class Meta:
        model = ImportedAttributes
        skip_unchanged = True
        import_id_fields  = ('inn', 'np_name')
    
    # def before_save_instance(self, instance, using_transactions, dry_run):
    #     # during 'confirm' step, dry_run is True
    #     instance.dry_run = dry_run

    # imported_names = set()

    # def after_import_row(self, row, row_result, row_number=None, **kwargs):
    #     self.imported_names.add(row.get("name"))

    # def skip_row(self, instance, original):
    #     return instance.name in self.imported_names
    
    # def import_data(self, *args, **kwargs):
    #     self.user = kwargs.get("user")
    #     return super().import_data(*args, **kwargs)

    # def skip_row(self, instance, original, row, import_validation_errors=None):
    #     skip = self.count % 2 == 0
    #     self.count += 1
    #     return super().skip_row(instance, original, row,
    #     import_validation_errors=import_validation_errors)

class ImportedAttributesAdmin(ImportExportModelAdmin):
    resorce_classes = [ImportedAttributesResource]
    list_display = ('id', 
                    'uuid', 
                    'inn',
                    'created_date', 
                    'np_name', 
                    'report_date')
admin.site.register(ImportedAttributes, ImportedAttributesAdmin)

# class CountedAttrFormulaAdmin(admin.ModelAdmin):
#     search_fields = ('uuid', )
#     list_display = ('id', 
#                     'uuid', 
#                     'author_id', 
#                     'created_date', 
#                     'active', 
#                     'attr_formulas', 
#                     'description', 
#                     'cntd_attr_id',
#                     'sql_query', 
#                     'nested_level')
# admin.site.register(CountedAttrFormula, CountedAttrFormulaAdmin)
class InnResResource(resources.ModelResource):
    class Meta:
        model = InnRes
        skip_unchanged = True
        import_id_fields  = ('inn')

    def after_export(self, queryset, data, *args, **kwargs):
        df = pd.DataFrame(list(data))
        # data = df
        print(df)

        columns = list(data.headers ) + [ "formula", "value"]
        print(columns)
        rows_new_df = []
        for row in range(len(df)):
        #     print(df.iloc[row]["result_score"], "\n")
        #     print(df.iloc[row].values, '\n')
        #     print(len(pd.json_normalize(json.loads(df.iloc[row]["result_score"]), "markers_and_values")))
        #     print(pd.json_normalize(json.loads(df.iloc[row]["result_score"]), "markers_and_values"))
            for marker in range(len(pd.json_normalize(json.loads(df.iloc[row]["result_score"]), "markers_and_values").values)):
                values_marker = pd.json_normalize(json.loads(df.iloc[row]["result_score"]), "markers_and_values").values[marker]
        #         print(pd.json_normalize(json.loads(df.iloc[row]["result_score"]), "markers_and_values").values[marker])
                x = df.iloc[row].values
                x = np.append(x, values_marker)
                rows_new_df.append(x)
                
        # print("Total result\n")
        # print(rows_new_df)
        # print("Total OTHER result\n")
        # print(x)
        # for i in rows_new_df:
        #     print(i[0], '\n')
        #     pd.json_normalize(json.loads(inn_res_data.get_col(6)[0]), 
        #                         "markers_and_values" )

        data = Dataset(pd.DataFrame(rows_new_df))


        return super().after_export(queryset, data, *args, **kwargs)

class InnResAdmin(ImportExportModelAdmin):
    resorce_classes = [InnResResource]
    list_display = ('id', 
                    'uuid', 
                    'inn',
                    'created_date'
                    )
admin.site.register(InnRes, InnResAdmin)

admin.site.register(FileAttributes)
admin.site.register(MainCatalog)
admin.site.register(MainCatalogFields)
admin.site.register(CountedAttributesNew)
admin.site.register(ScoringModel, SimpleHistoryAdmin)

# admin.site.register(ScoringModelHistory)

class MarkersAttributesAdmin(admin.ModelAdmin):
    search_fields = ('uuid', )
    list_display = ('id', 
                    'uuid', 
                    'author_id', 
                    'created_date', 
                    'active', 
                    'name_marker_attr')
    def save_model(self, request, obj, form, change):
        obj.author = request.user
        super().save_model(request, obj, form, change)
admin.site.register(MarkersAttributes, MarkersAttributesAdmin)


### CRM DATA REGISTER ###########################################################################################

#----------------
# СПРАВОЧНИКИ

admin.site.register(Manager)
admin.site.register(Region)
admin.site.register(SupportMeasure)
admin.site.register(ReviewStage)
admin.site.register(DebtType)
admin.site.register(Category)
admin.site.register(ApplicantStatus)
admin.site.register(InformationSourceType)
admin.site.register(PositiveDecision)
admin.site.register(NegativeDecision)
#---------------------

#---------------------
# MAIN
admin.site.register(ClientRepresentative)
admin.site.register(InformationSource)
admin.site.register(ComplianceCriteria)
admin.site.register(KPI)
admin.site.register(FieldsOfPositiveDecisions)
admin.site.register(KpiPositiveDecisionFields)

class ClientResource(resources.ModelResource):
    class Meta:
        model = InnRes
        skip_unchanged = True
        import_id_fields  = ('inn')

class ClientAdmin(ImportExportModelAdmin):
    resorce_classes = [InnResResource]
    list_display = ('id', 
                    'uuid', 
                    'inn',
                    'created_date'
                    )
admin.site.register(Client, ClientAdmin)
#---------------------