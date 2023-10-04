from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin, ImportExportModelAdmin

from .models import *


class CsvAttributesResource(resources.ModelResource):
    def before_save_instance(self, instance, using_transactions, dry_run):
        # during 'confirm' step, dry_run is True
        instance.dry_run = dry_run
    
    # def import_data(self, *args, **kwargs):
    #     self.user = kwargs.get("user")
    #     return super().import_data(*args, **kwargs)

    # def skip_row(self, instance, original, row, import_validation_errors=None):
    #     skip = self.count % 2 == 0
    #     self.count += 1
    #     return super().skip_row(instance, original, row,
    #     import_validation_errors=import_validation_errors)

    class Meta:
        model = CsvAttributes
        skip_unchanged = True
        import_id_fields  = ('inn', 'np_name')
        # use_bulk = True


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
