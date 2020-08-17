from django.db import models
from features.models import Features
from domains.models import Domain
# Create your models here.

class DomainFeatures(models.Model):
    domain_id = models.ForeignKey(Features, on_delete=models.CASCADE, related_name='domiain_id' ) 
    feature_id = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name='feature_id') 

    def __str__(self):
        return self.name

    def getinfo(self):
        return ({'id':self.domain_id, 'name': self.feature_id})