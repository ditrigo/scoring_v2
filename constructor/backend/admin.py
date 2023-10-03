from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin, ImportExportModelAdmin

from .models import *


class CsvAttributesResource(resources.ModelResource):
    class Meta:
        model = CsvAttributes

# class CsvAttributesAdmin(ImportExportModelAdmin):
#     resorce_classes = [CsvAttributes]
#     list_display = ('id', 
#                     'uuid', 
#                     'inn',
#                     'created_date', 
#                     'np_name', 
#                     'report_date')


class CountedAttributesAdmin(admin.ModelAdmin):

    search_fields = ('uuid', )

    list_display = ('id', 
                    'uuid', 
                    'author_id', 
                    'created_date', 
                    'active', 
                    'name_counted_attr')


class CountedAttrFormulaAdmin(admin.ModelAdmin):
    
    search_fields = ('uuid', )

    list_display = ('id', 
                    'uuid', 
                    'author_id', 
                    'created_date', 
                    'active', 
                    'attr_formulas', 
                    'description', 
                    'cntd_attr_id',
                    'sql_query', 
                    'nested_level')


admin.site.register(FileAttributes)
admin.site.register(CsvAttributes)
# admin.site.register(CsvAttributes, CsvAttributesAdmin)

admin.site.register(MainCatalog)
admin.site.register(MainCatalogFields)

admin.site.register(ScoringModel)
admin.site.register(ScoringModelHistory)

admin.site.register(CountedAttributes, CountedAttributesAdmin)
admin.site.register(CountedAttrFormula, CountedAttrFormulaAdmin)

admin.site.register(InnRes)
