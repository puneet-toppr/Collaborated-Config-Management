from django.views.generic import View
from .models import Domain
from django.http.response import JsonResponse
import json

# Create your views here.
class DomainView(View):

    def get(self, request, d_id): #get a domain name using its id

        if Domain.objects.filter(id=d_id).exists(): #raising error if domain with provided id doesn't exist
            domain_object = Domain.objects.get(id=d_id) 
        else:
            return JsonResponse({'error_message':'The requested domain does not exist'})
                
        args = {'domain_info':domain_object.get_info()} 

        return JsonResponse(args) #returning domain's name and id


    def delete(self, request, d_id):
        
        if Domain.objects.filter(id=d_id).exists(): #raising error if domain with provided id doesn't exist
            domain_object = Domain.objects.get(id=d_id) #fetching the object to be deleted if it exists
            domain_info = domain_object.get_info() #after delete operation, domain_id becomes null
        else:
            return JsonResponse({'error_message': 'The requested domain does not exist'}) 

        domain_object.delete()
        args = {'domain_info':domain_info}

        return JsonResponse(args) #returning deleted domain's name and id

class DomainGetPost(View):

    def get(self, request): #fetch list of all the domains

        domains = Domain.objects.all() #fetch all domain objects
        domains_info = []

        for domain in domains:
            domains_info.append(domain.get_info()) #storing name and id of all domains in a list

        args = {'domains_info':domains_info}
        return JsonResponse(args) #returning list containing domain's ids and names


    def post(self, request):
        
        try: #raising error if body cannot be parsed 
            json_data = json.loads(str(request.body, encoding='utf-8'))
        except:
            return JsonResponse({'error_message':'posted body cannot be parsed, post in json format'})

        try: #raising error if domain name is not under 'name' key
            domain_name = (json_data['name'])
        except:
            return JsonResponse({'error_message':'Kindly post the domain name under \'name\' key'})

        #checking if domain with provided name already exists
        if Domain.objects.filter(name=(domain_name.lower())).exists(): 
            return JsonResponse({'error_message':('domain ' + str(domain_name.lower()) + ' already exists')})

        domain_object = Domain.objects.create(name=(domain_name.lower())) 
        #creating a new domain object if it doesn't exist

        args = {'domain_info':domain_object.get_info()}
        return JsonResponse(args) #returning added domain's name and id