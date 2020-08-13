from django import forms
from .models import DomainName

class AddDomainForm(forms.ModelForm):
    class Meta:
        model = DomainName
        fields = '__all__'