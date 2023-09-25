from django.db import models
from django.utils.translation import gettext_lazy
from django.core.exceptions import ValidationError
from datetime import datetime


# Create your models here.

class Post(models.Model):

    class Meta:
        db_table = 'posts'  # name in db
        verbose_name = 'post'  # display single
        verbose_name_plural = 'posts'   # display plural

    title = models.TextField(verbose_name='Posts title')
    body = models.TextField(verbose_name='Posts text')
    created_dt = models.DateTimeField(verbose_name="post created", auto_now_add=True)
    updated_dt = models.DateTimeField(verbose_name="post updated", blank=True, null=True)

    def __str__(self):
        return f"Post {self.title}"
    
    def save(self, *args, **kwargs):
        self.updated_dt = datetime.now()
        super().save(*args, **kwargs)

    

class PostComment(models.Model):

    class Meta:
        db_table = 'posts_comments'
        verbose_name = 'comment'
        verbose_name_plural = 'comments'


    statuses = (("open", "opened"),
                ("close", "closed"),
                ("in progress", "in progressed"))
    

    post_id = models.ForeignKey(Post, on_delete=models.RESTRICT, verbose_name='Post ID')
    comment = models.TextField(verbose_name='comment')
    status = models.CharField(max_length=20, verbose_name='status', choices=statuses)  # or use validators=[status_validator] to validate
    created_dt = models.DateTimeField(verbose_name='created', auto_now_add=True)
    updated_dt = models.DateTimeField(verbose_name='updated', blank=True, null=True)

    
    def save(self, *args, **kwargs):
        self.updated_dt = datetime.now()
        super().save(*args, **kwargs)