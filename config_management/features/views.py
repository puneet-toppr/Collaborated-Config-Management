from django.shortcuts import render, redirect, HttpResponse
from .models import Features
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
import json
from django.views.generic.base import TemplateView

from django.core import serializers
from django.core.serializers.json import Serializer

# class ValidateFormSerializer(serializers.json.Serializer):
#     name = Serializers.CharField(required=True, max_length=128)

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
            return JsonResponse({'status_code':''})

        # valid_ser = ValidateFormSerializer(data=request.data)
        # if valid_ser.is_valid():
        #     return JsonResponse({'status_code':''})

        feature_name = (json_data['name'])
        feature_object = Features.objects.create(name=feature_name)
        args = { 'status_code':200,'feature_info':feature_object.getinfo()}

        return JsonResponse(args)
        
class FeaturesClassSecond(View):

    def get(self, request,feature_id):
        feature_object = Features.objects.filter(id=feature_id).exists()
        if not feature_object:
               return JsonResponse({'error_message':'The requested feature does not exist'})
        
        feature_object = Features.objects.get(id=feature_id)
        args = {'status_code':200,'feature_info':feature_object.getinfo()} 

        return JsonResponse(args)
    
        
    def delete(self, request,feature_id ):
        feature_object = Features.objects.filter(id=feature_id).exists()
        if not feature_object:
               return JsonResponse({'error_message':'The requested feature does not exist'})

        Features.objects.filter(id=feature_id).delete()
        args = {'status_code':200,'feature_id':feature_id}

        return JsonResponse(args)
        