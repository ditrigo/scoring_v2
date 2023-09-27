from django.urls import path

from . import views

urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('csv_attributes/', views.Csv_AttributeList.as_view()),
    path('csv_attributes/<int:pk>/', views.Csv_AttributeDetail.as_view()),
    path('counted_att/', views.Counted_AttList.as_view()),
    path('counted_att/<int:pk>/', views.Counted_AttDetail.as_view()),
    path('counted_att_formula/', views.Counted_Att_FormulaList.as_view()),
    path('counted_att_formula/<int:pk>/', views.Counted_Att_FormulaDetail.as_view()),
]