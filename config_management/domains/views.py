from django.shortcuts import render, redirect, HttpResponse
from django.views.generic import View, TemplateView
from .models import DomainName
# from .forms import AddDomainForm
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

def list_all_domains(request):
    if request.method == 'GET':

        temp = DomainName.objects.all()
        domain_list = []
        for i in temp:
            domain_list.append((i.name, i.id))

        args = {'listing all domains':'ok', 'status_code':200, 'list of all domains':domain_list}
        return JsonResponse(args)
        # return HttpResponse('OK 200')
    else:
        return JsonResponse({'error':'method not supported'})

def list_one_domain(request, search_d_id):
    if request.method == 'GET':

        try:
            temp = DomainName.objects.get(id=search_d_id)
        except:
            return JsonResponse({'domain does not exist':'sorry boi, the requested domain does not exist'})

        args = {'listing one domains': 'ok', 'domain_name': temp.name, 'domain_id': temp.id}
        return JsonResponse(args)
    return JsonResponse({'error':'method not supported'})

@csrf_exempt
def add_domain(request):
    if request.method == 'POST':
        json_data = json.loads(str(request.body, encoding='utf-8'))
        new_domain_name = (json_data['name'])
        DomainName.objects.create(name=new_domain_name)
        added_domain_id = DomainName.objects.get(name=new_domain_name).id

        args = {'create domain': 'ok', 'created domain name':new_domain_name, 'added_domain_id':added_domain_id}
        return JsonResponse(args)

    return JsonResponse({'error':'method not supported'})

# def update_domain(request, search_d_id):
#     if request.method == 'PUT':
#         args = {'update domain': 'ok'}
#         return args
#
#     return JsonResponse({'error':'method not supported'})

@csrf_exempt
def delete_domain(request, search_d_id):
    if request.method == 'DELETE':
        try:
            temp = DomainName.objects.get(id=search_d_id)
            deleted_domain_name = temp.name
            deleted_domain_id = temp.id
        except:
            return JsonResponse({'domain does not exist': 'sorry boi, the requested domain does not exist'})
        temp.delete()
        args = {'delete domain': 'ok', 'deleted_domain_name':deleted_domain_name, 'deleted_domain_id':deleted_domain_id}
        return JsonResponse(args)

    return JsonResponse({'error':'method not supported'})