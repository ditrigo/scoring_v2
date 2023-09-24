from django.contrib import admin


# Add models

from .models import Post, PostComment   

# Model view in admin pannel

class PostAdmin(admin.ModelAdmin):    
    list_display = ('id', 'title', 'body')


class PostCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'post_id', 'comment', 'status', 'created_dt', 'updated_dt')


# Register model

admin.site.register(Post, PostAdmin)
admin.site.register(PostComment, PostCommentAdmin)
