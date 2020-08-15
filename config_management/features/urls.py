from django.urls import path, include
from . import views

from .views import FeaturesClass, FeaturesClassSecond
from django.views.decorators.csrf import csrf_exempt
from django.contrib import admin

urlpatterns = [
    path('', csrf_exempt(FeaturesClass.as_view()), name='home'),
    path('<str:feature_id>', csrf_exempt(FeaturesClassSecond.as_view()), name='home_id'),
    
]
