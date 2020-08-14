from django.contrib import admin
from django.urls import path, include
from .views import DomainView
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('<str:d_id>', csrf_exempt(DomainView.as_view()), name = 'list_one_domain'),
    path('', csrf_exempt(DomainView.as_view()), name= 'list_add_domain'),
    path('<str:d_id>/delete', csrf_exempt(DomainView.as_view()), name = 'delete_domain'),
]


