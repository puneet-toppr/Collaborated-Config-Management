from django.shortcuts import render, redirect, HttpResponse
from django.views.generic import View, TemplateView
from .models import DomainName
from .forms import AddDomainForm
from django.http.response import JsonResponse

# Create your views here.

def list_all_domains(request):
    if request.method == 'GET':
        args = {'listing all domains':'ok', 'status_code':200}
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

        args = {'listing one domains': 'ok', 'name': temp.name, 'id': temp.id}
        return JsonResponse(args)
    return JsonResponse({'error':'method not supported'})

def add_domain(request):
    if request.method == 'POST':
        form = AddDomainForm(request.POST)
        if form.is_valid():
            form.save()
        else:
            return JsonResponse({'Sorry bud':'The entered values are not valid'})
        args = {'create domain': 'ok'}
        return JsonResponse(args)

    return JsonResponse({'error':'method not supported'})

# def update_domain(request, search_d_id):
#     if request.method == 'PUT':
#         args = {'update domain': 'ok'}
#         return args
#
#     return JsonResponse({'error':'method not supported'})

def delete_domain(request, search_d_id):
    if request.method == 'DELETE':
        try:
            temp = DomainName.objects.get(id=search_d_id)
        except:
            return JsonResponse({'domain does not exist': 'sorry boi, the requested domain does not exist'})
        temp.delete()
        args = {'delete domain': 'ok'}
        return JsonResponse(args)

    return JsonResponse({'error':'method not supported'})