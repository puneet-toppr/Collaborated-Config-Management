from django.shortcuts import render, redirect, HttpResponse
from .models import Features
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
import json
from django.views.generic.base import TemplateView

class FeaturesClass(View):

    def get(self, request):
        temp = Features.objects.all()
        feature_list = []
        for i in temp:
            feature_list.append((i.getinfo()['name'], i.getinfo()['id']))

        args = { 'status_code':200, 'list of all features':feature_list}
        return JsonResponse(args)
    
    def post(self, request):
        json_data = json.loads(str(request.body, encoding='utf-8'))
        feature_name = (json_data['name'])
        Features.objects.create(name=feature_name)
        feature_id = Features.objects.get(name=feature_name).id

        args = { 'status_code':200,'feature name':feature_name, 'feature_id':feature_id}
        return JsonResponse(args)
        

