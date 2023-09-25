from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.forms import model_to_dict

from .models import Post
from .serializers import PostSerializer


class PostAPIView(APIView):
    
    def get(self, request):
        lst = Post.objects.all()
        return Response({'posts': PostSerializer(lst, many = True).data})
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        post_new = Post.objects.create(
            title = request.data['title'],
            body = request.data['body'],
        )
        return Response({'post': PostSerializer(post_new).data})



# class PostAPIView(generics.ListAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer