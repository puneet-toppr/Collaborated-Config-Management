from django.db import models

# Create your models here.

class Domain(models.Model): 
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    def get_info(self):
    	return ({'name':self.name, 'id':self.id})


