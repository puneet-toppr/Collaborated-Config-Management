from django.views.generic import View
from .models import Domain
from django.http.response import JsonResponse
import json

# Create your views here.
class DomainView(View):

    def get(self, request, d_id):

        if d_id == 'all':
            all_domains = Domain.objects.all()

            domain_info = []
            domain_names = []
            domain_ids = []

            for i in all_domains:
                domain_info.append((i.get_info()['id'], i.get_info()['name']))
                domain_names.append(i.get_info()['name'])
                domain_ids.append(i.get_info()['id'])

            args = {'domain_info':domain_info, 'domain_names':domain_names, 'domain_ids':domain_ids}

            return JsonResponse(args)

        else:

            try:
                domain_object = Domain.objects.get(id=d_id)
            except:
                return JsonResponse({'error_message':'The requested domain does not exist'})
                
            domain_name = domain_object.get_info()['name']
            domain_id = domain_object.get_info()['id']

            args = {'domain_name':domain_name, 'domain_id':domain_id}

            return JsonResponse(args)


    def post(self, request):
            
        json_data = json.loads(str(request.body, encoding='utf-8'))
        
        domain_name = (json_data['name'])
        Domain.objects.create(name=domain_name)
        domain_id = Domain.objects.get(name=domain_name).get_info()['id']

        args = {'domain_name':domain_name, 'domain_id':domain_id}
        return JsonResponse(args)


    def delete(self, request, d_id):
        
        try:
            domain_object = Domain.objects.get(id=d_id)

            name = domain_object.name

            domain_name = domain_object.get_info()['name']
            domain_id = domain_object.get_info()['id']
        except:
            return JsonResponse({'error_message': 'The requested domain does not exist'})

        domain_object.delete()
        args = {'domain_name':domain_name, 'domain_id':domain_id}

        return JsonResponse(args)
