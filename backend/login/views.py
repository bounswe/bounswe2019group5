from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User

class LoginView(APIView):
    
    def post(self,request):

        isUser = False
        response = {
            'token':'not ok',
            'status':'1'
        }
        

        if 'user_name' in request.data:
            username = request.data['user_name']
            if User.objects.filter(username=username).exists():
                user = User.objects.get(username=username)
                isUser = user.password == request.data['password']
            
        elif 'email' in request.data:
            email = request.data['email']
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                isUser = user.password == request.data['password']
        
        if isUser:
            response = {
                'token':'ok',
                'status':'0'
        }
        
        
        return Response(response)

class RegisterView(APIView):
    def post(self,request):
        req = request.data
        

        try:
            user = User(
                name = req['name'],
                surname = req['surname'],
                username = req['user_name'],
                email = req['email'],
                password = req['password'],
                nativeLanguage = req['native_language'])
            user.save()

            response = {
                'token':'ok',
                'status':0
            }
        except:
            response = {
                'token':'not ok',
                'status':1
            }
            
        return Response(response)


class GuestView(APIView):
    def post(self,request):
        return Response({
            'token':'expected_token',
            'status':0
        })