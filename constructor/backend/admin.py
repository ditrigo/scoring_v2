from django.contrib import admin
from import_export.admin import ImportExportActionModelAdmin, ImportExportModelAdmin

from .models import *

class CsvAttributesAdmin(ImportExportModelAdmin):
    resorce_classes = [CsvAttributes]
    list_display = ('id', 
                    'uuid', 
                    'inn',
                    'created_date', 
                    'np_name', 
                    'report_date')
    

admin.site.register(FileAttributes)
admin.site.register(CsvAttributes, CsvAttributesAdmin)

admin.site.register(MainCatalog)
admin.site.register(MainCatalogFields)

admin.site.register(ScoringModel)
admin.site.register(ScoringModelHistory)

admin.site.register(CountedAttributes)
admin.site.register(CountedAttrFormula)

admin.site.register(InnRes)
