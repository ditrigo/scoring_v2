from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Post, Csv_Attribute, Counted_Att, Counted_Att_Formula


# class PostModel:
#     def __init__(self, title, body)
#         self.title = title
#         self.body = body

# class PostSerializer(serializers.ModelSerializer):

    # class Meta:
    #     model = Post
    #     fields = ('id', 'title', 'body')


class PostSerializer(serializers.Serializer):

    title = serializers.CharField()
    body = serializers.CharField()
    created_dt = serializers.DateTimeField(read_only=True)
    updated_dt = serializers.DateTimeField(read_only=True)
    author = serializers.ReadOnlyField(source='author.username')


class UserSerializer(serializers.ModelSerializer):

    posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())
    csv_attributes = serializers.PrimaryKeyRelatedField(many=True, queryset=Csv_Attribute.objects.all())
    counted_atts = serializers.PrimaryKeyRelatedField(many=True, queryset=Counted_Att.objects.all())
    counted_att_formulas = serializers.PrimaryKeyRelatedField(many=True, queryset=Counted_Att_Formula.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'posts', 'csv_attributes', 'counted_atts', 'counted_att_formulas']


class Csv_AttributeSerializer(serializers.Serializer):

    uuid = serializers.CharField()
    author = serializers.ReadOnlyField(source='author.username')
    created_dt = serializers.DateTimeField(read_only=True)
    updated_dt = serializers.DateTimeField(read_only=True)
    company_name = serializers.CharField()
    report_d = serializers.DateField()


class Counted_AttSerializer(serializers.Serializer):

    uuid = serializers.CharField()
    author = serializers.ReadOnlyField(source='author.username')
    created_dt = serializers.DateTimeField(read_only=True)
    updated_dt = serializers.DateTimeField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    name_cntd_att = serializers.CharField()


class Counted_Att_FormulaSerializer(serializers.Serializer):

    uuid = serializers.CharField()
    author = serializers.ReadOnlyField(source='author.username')
    created_dt = serializers.DateTimeField(read_only=True)
    updated_dt = serializers.DateTimeField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    att_formula = serializers.CharField()
    att_formula_sql = serializers.CharField(read_only=True)
    description = serializers.CharField()
    nested_level = serializers.IntegerField(read_only=True)