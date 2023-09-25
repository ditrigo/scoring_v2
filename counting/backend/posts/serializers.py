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
    # if could be blank -     body = serializers.CharField(read_only=True)