from django.db import models

# Create your models here.

class Features(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    def getinfo(self):
        return ({'id':self.id, 'name': self.name})
