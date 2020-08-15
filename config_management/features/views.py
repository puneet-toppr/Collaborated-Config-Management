from django.shortcuts import render, redirect, HttpResponse
from .models import Features
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
import json
from django.views.generic.base import TemplateView

from django.core import serializers
from django.core.serializers.json import Serializer

class FeaturesClass(View):

    def get(self, request):
        feature_queryset = Features.objects.all()
        feature_list = []
        for feature in feature_queryset.iterator():
            feature_list.append((feature.name, feature.id))

        args = { 'status_code':200, 'feature_list':feature_list}
        return JsonResponse(args)
    
    def post(self, request):

        try: 
            json_data = json.loads(str(request.body, encoding='utf-8'))
        except:
            return error(1001,'json format is not correct')

        try: 
            feature_name = (json_data['name'])
        except:
             return error(1002,'name field is not present')
             
        if Features.objects.filter(name=(feature_name.lower())).exists(): 
            return error(1003,'name is already in use')

        feature_object = Features.objects.create(name=(feature_name.lower())) 
        args = { 'status_code':200,'feature_info':feature_object.getinfo()}

        return JsonResponse(args)
        
class FeaturesClassSecond(View):

    def get(self, request,feature_id):
        feature_object = Features.objects.filter(id=feature_id).exists()
        if not feature_object:
               return error(2001,'feature does not exist')
        
        feature_object = Features.objects.get(id=feature_id)
        args = {'status_code':200,'feature_info':feature_object.getinfo()} 

        return JsonResponse(args)
    
        
    def delete(self, request,feature_id ):
        feature_object = Features.objects.filter(id=feature_id).exists()
        if not feature_object:
               return error(3001,'feature to be deleted does not exist')

        Features.objects.filter(id=feature_id).delete()
        args = {'status_code':200,'feature_id':feature_id}

        return JsonResponse(args)

def error(error_code, error_message):
    return JsonResponse({'error_code':error_code,'error_message':error_message })
     
        