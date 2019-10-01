from django.db import models

class User(models.Model):

    languageChoices = [
        ('english','english'),
        ('turkish','turkish'),
        ('german','german')
    ]

    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    username = models.CharField(max_length=50,unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=50)
    nativeLanguage = models.CharField(max_length=20, choices=languageChoices)

    

    def __str__(self):
        return ' '.join([self.name,self.surname])


