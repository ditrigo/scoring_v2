from rest_framework import serializers
from .models import Post


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