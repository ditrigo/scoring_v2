from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin, ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin
from .models import *


class CsvAttributesResource(resources.ModelResource):
    class Meta:
        model = CsvAttributes
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

# class CsvAttributesAdmin(ImportExportModelAdmin):
#     resorce_classes = [CsvAttributes]
#     list_display = ('id', 
#                     'uuid', 
#                     'inn',
#                     'created_date', 
#                     'np_name', 
#                     'report_date')


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

admin.site.register(ScoringModel, SimpleHistoryAdmin)
# admin.site.register(ScoringModelHistory)

class CountedAttributesAdmin(admin.ModelAdmin):
    search_fields = ('uuid', )
    list_display = ('id', 
                    'uuid', 
                    'author_id', 
                    'created_date', 
                    'active', 
                    'name_counted_attr')
    def save_model(self, request, obj, form, change):
        obj.author = request.user
        super().save_model(request, obj, form, change)
admin.site.register(CountedAttributes, CountedAttributesAdmin)


admin.site.register(CountedAttrFormula, CountedAttrFormulaAdmin)

admin.site.register(InnRes)
