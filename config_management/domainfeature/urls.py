from django.urls import path, include
from . import views

from django.views.decorators.csrf import csrf_exempt
from django.contrib import admin

urlpatterns = [
    # path('', csrf_exempt(), name='home'),
    # path('<str:feature_id>', csrf_exempt(), name='home_id'),
    
]
