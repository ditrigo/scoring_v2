from django.contrib import admin


# Add models

from .models import Post, PostComment, Csv_Attribute, Counted_Att, Counted_Att_Formula 

# Model view in admin pannel

class PostAdmin(admin.ModelAdmin):    

    search_fields = ('title', )  # searching field
    
    list_display = ('id', 'title', 'body', 'created_dt', 'updated_dt', 'author')  # attributes to display


class PostCommentAdmin(admin.ModelAdmin):
    
    # getting from related tables
    def my_post(self, obj):
        return obj.post_id.title

    my_post.short_description = 'Posty'

    search_fields = ('post_id__title', )

    list_display = ('id', 'post_id', 'comment', 'status', 'created_dt', 'updated_dt', 'author')

    # selector to writing
    #raw_id_fields = ('post_id', )


class Csv_AttributeAdmin(admin.ModelAdmin):

    search_fields = ('uuid', )

    list_display = ('id', 'uuid', 'author', 'created_dt', 'updated_dt', 'company_name', 'report_d')


class Counted_AttAdmin(admin.ModelAdmin):

    search_fields = ('uuid', )

    list_display = ('id', 'uuid', 'author', 'created_dt', 'updated_dt', 'is_active', 'name_cntd_att')


class Counted_Att_FormulaAdmin(admin.ModelAdmin):
    
    search_fields = ('uuid', )

    list_display = ('id', 'uuid', 'author', 'created_dt', 'updated_dt', 'is_active', 'att_formula', 'att_formula_sql', 'description', 'nested_level', 'result')



# Register models

admin.site.register(Post, PostAdmin)
admin.site.register(PostComment, PostCommentAdmin)
admin.site.register(Csv_Attribute, Csv_AttributeAdmin)
admin.site.register(Counted_Att, Counted_AttAdmin)
admin.site.register(Counted_Att_Formula, Counted_Att_FormulaAdmin)
