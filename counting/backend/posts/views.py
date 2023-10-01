from rest_framework import generics, permissions
from django.contrib.auth.models import User

from .permissions import IsOwnerOrReadOnly
from .models import Post, Csv_Attribute, Counted_Att, Counted_Att_Formula
from .serializers import PostSerializer, UserSerializer, Csv_AttributeSerializer, Counted_AttSerializer, Counted_Att_FormulaSerializer


class PostList(generics.ListCreateAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]


class UserList(generics.ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class Csv_AttributeList(generics.ListCreateAPIView):

    queryset = Csv_Attribute.objects.all()
    serializer_class = Csv_AttributeSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class Csv_AttributeDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Csv_Attribute.objects.all()
    serializer_class = Csv_AttributeSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]
    

class Counted_AttList(generics.ListCreateAPIView):

    queryset = Counted_Att.objects.all()
    serializer_class = Counted_AttSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class Counted_AttDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Counted_Att.objects.all()
    serializer_class = Counted_AttSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]


class Counted_Att_FormulaList(generics.ListCreateAPIView):

    queryset = Counted_Att_Formula.objects.all()
    serializer_class = Counted_Att_FormulaSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class Counted_Att_FormulaDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Counted_Att_Formula.objects.all()
    serializer_class = Counted_Att_FormulaSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]

    
# ------------------------------
# common 


# class PostAPIView(APIView):
    
#     def get(self, request, format=None):
#         posts = Post.objects.all()
#         serializer = PostSerializer(posts, many=True)
#         return Response({'posts': serializer.data})
    
#     def post(self, request, format=None):
#         serializer = PostSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         post_new = Post.objects.create(
#             title = request.data['title'],
#             body = request.data['body'],
#         )
#         return Response({'post': PostSerializer(post_new).data})


# class PostDetail(APIView):
    
#     def get_object(self, pk):
#         try:
#             return Post.objects.get(pk=pk)
#         except Post.DoesNotExist:
#             raise Http404
        
#     def get(self, request, pk, format=None):
#         post = self.get_object(pk)
#         serializer = PostSerializer(post)
#         return Response(serializer.data)

#     def put(self, request, pk, format=None):
#         post = self.get_object(pk)
#         serializer = PostSerializer(post, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def delete(self, request, pk, format=None):
#         post = self.get_object()
#         post.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    

# -------------------------------------
# same thing using Mixing

# class PostAPIView(mixins.ListModelMixin,
#                   mixins.CreateModelMixin,
#                   generics.GenericAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)
    

# class PostDetail(mixins.RetrieveModelMixin,
#                  mixins.UpdateModelMixin,
#                  mixins.DestroyModelMixin,
#                  generics.GenericAPIView):
                    
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)

#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)

#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)


