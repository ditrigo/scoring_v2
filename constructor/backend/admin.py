from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(FileAttributes)
admin.site.register(CsvAttributes)
admin.site.register(MainCatalog)
admin.site.register(MainCatalogFields)
admin.site.register(ScoringModel)
admin.site.register(ScoringModelHistory)
admin.site.register(CountedAttributes)
admin.site.register(CountedAttrFormula)
admin.site.register(InnRes)
