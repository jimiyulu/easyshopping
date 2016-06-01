from django import forms
from .models import Mall, User, Brand, Store, User_store

class User_Register(forms.ModelForm):
    class Meta:
        model = User
        fields = ('user_id', 'user_name', 'user_password', )


class User_Login(forms.ModelForm):
    class Meta:
        model = User
        fields = ('user_id', 'user_password', )