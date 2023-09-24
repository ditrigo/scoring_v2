from django.contrib import admin


# Add models

from .models import Post, PostComment   

# Model view in admin pannel

class PostAdmin(admin.ModelAdmin):    

    search_fields = ('title', )  # searching field
    
    list_display = ('id', 'title', 'body')  # attributes to display


class PostCommentAdmin(admin.ModelAdmin):
    
    # getting from related tables
    def my_post(self, obj):
        return obj.post_id.title

    my_post.short_description = 'Posty'

    search_fields = ('post_id__title', )

    list_display = ('id', 'post_id', 'comment', 'status', 'created_dt', 'updated_dt')

    # selector to writing
    raw_id_fields = ('post_id', )


# Register model

admin.site.register(Post, PostAdmin)
admin.site.register(PostComment, PostCommentAdmin)
