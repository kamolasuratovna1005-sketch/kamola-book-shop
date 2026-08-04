from django.urls import path

from core import views

app_name = 'core'

urlpatterns = [
    path('set-language/', views.set_language, name='set_language'),
    path('toggle-theme/', views.toggle_theme, name='toggle_theme'),
]
