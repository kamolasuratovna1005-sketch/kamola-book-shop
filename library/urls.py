from django.urls import path

from library import views

app_name = 'library'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('add/', views.add_book, name='add_book'),
    path('delete/<int:pk>/', views.delete_book, name='delete_book'),
]
