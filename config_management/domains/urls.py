from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('new/add', views.add_domain, name = 'add_domain'),  # dont add / at the end of url
    path('<str:search_d_id>', views.list_one_domain, name = 'list_one_domain'),
    path('', views.list_all_domains, name='list_all_domains'),
    # path('<str:search_d_id>/update', views.update_domain, name = 'update_domain'),
    path('<str:search_d_id>/delete', views.delete_domain, name = 'delete_domain'),  # dont add / at the end of url

]


