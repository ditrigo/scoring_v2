from django.db import models
from django.utils.translation import gettext_lazy
from django.core.exceptions import ValidationError
from datetime import datetime

from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from .parser import parser


# Create your models here.

class Post(models.Model):

    class Meta:
        db_table = 'posts'  # name in db
        verbose_name = 'post'  # display single
        verbose_name_plural = 'posts'   # display plural

    title = models.TextField(verbose_name='Posts title')
    body = models.TextField(verbose_name='Posts text')
    created_dt = models.DateTimeField(verbose_name='post created', auto_now_add=True)
    updated_dt = models.DateTimeField(verbose_name='post updated', blank=True, null=True)
    author = models.ForeignKey('auth.User', related_name='posts', verbose_name='author', on_delete=models.CASCADE)

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
    author = models.ForeignKey('auth.User', related_name='posts_comment', verbose_name='author', on_delete=models.RESTRICT)

    
    def save(self, *args, **kwargs):
        self.updated_dt = datetime.now()
        super().save(*args, **kwargs)


class Csv_Attribute(models.Model):

    class Meta:
        db_table = 'csv_attributes'
        verbose_name = 'csv_attribute'
        verbose_name_plural = 'csv_attributes'

    uuid = models.TextField(verbose_name='UUID')
    author = models.ForeignKey('auth.User', related_name='csv_attributes', verbose_name='author', on_delete=models.CASCADE)
    created_dt = models.DateTimeField(verbose_name='created', auto_now_add=True)
    updated_dt = models.DateTimeField(verbose_name='updated', blank=True, null=True)
    company_name = models.TextField(verbose_name='company')
    report_d = models.DateField(verbose_name='report day', auto_now_add=True)
    att_001 = models.FloatField(verbose_name = 'credit', blank=True, null=True)
    att_002 = models.FloatField(verbose_name='deposit', blank=True, null=True)
    att_003 = models.FloatField(verbose_name='fine', blank=True, null=True)

    def __str__(self):
        return f"UUID {self.uuid}"
    
    def save(self, *args, **kwargs):
        self.updated_dt = datetime.now()
        super().save(*args, **kwargs)


class Counted_Att(models.Model):

    class Meta:
        db_table = 'counted_att'
        verbose_name = 'counted_att'
        verbose_name_plural = 'counted_atts'

    uuid = models.ForeignKey(Csv_Attribute, on_delete=models.RESTRICT, verbose_name='UUID')
    author = models.ForeignKey('auth.User', related_name='counted_atts', verbose_name='author', on_delete=models.CASCADE)
    created_dt = models.DateTimeField(verbose_name='created', auto_now_add=True)
    updated_dt = models.DateTimeField(verbose_name='updated', blank=True, null=True)
    is_active = models.BooleanField(verbose_name='is active', blank=True, null=True)
    name_cntd_att = models.TextField(verbose_name='attribute name')

    def __str__(self):
        return f"{self.uuid}"
    
    def save(self, *args, **kwargs):
        self.updated_dt = datetime.now()
        super().save(*args, **kwargs)


class Counted_Att_Formula(models.Model):

    class Meta:
        db_table = 'counted_att_formula'
        verbose_name = 'counted_att_formula'
        verbose_name_plural = 'counted_att_formulas'

    uuid = models.ForeignKey(Csv_Attribute, on_delete=models.RESTRICT, verbose_name='UUID')
    author = models.ForeignKey('auth.User', related_name='counted_att_formulas', verbose_name='author', on_delete=models.CASCADE)
    created_dt = models.DateTimeField(verbose_name='created', auto_now_add=True)
    updated_dt = models.DateTimeField(verbose_name='updated', blank=True, null=True)
    is_active = models.BooleanField(verbose_name='is active', blank=True, null=True)
    att_formula = models.TextField(verbose_name='formula')
    att_formula_sql = models.TextField(verbose_name='SQL formula', blank=True, null=True)
    description = models.TextField(verbose_name='description')
    nested_level = models.IntegerField(verbose_name='nested level', blank=True, null=True)
    result = models.FloatField(verbose_name='result', blank=True, null=True)

    def __str__(self):
        return f"Name {self.att_formula}"
    
    def save(self, *args, **kwargs):
        self.updated_dt = datetime.now()
        self.att_formula_sql = parser(self.att_formula)
        #self.result = Csv_Attribute.objects.raw(self.att_formula_sql)
        super().save(*args, **kwargs)