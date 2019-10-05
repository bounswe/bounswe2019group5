from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User

class LoginView(APIView):
    
    def post(self,request):

        if 'user_name' in request.data:
            user = User.objects.filter(username=request.data.get('user_name')).first()
        else:
            user = User.objects.filter(email=request.data.get('email')).first()

        if not user or not user.check_password(request.data.get('password')):
            return Response({
                'token':'not ok',
                'message':'1'
            })

        response = {
            'token':'ok',
            'message':'0'
        }
        
        
        return Response(response)

class RegisterView(APIView):
    def post(self,request):
        req = request.data
        

        try:
            user = User(
                first_name = req['name'],
                last_name = req['surname'],
                username = req['user_name'],
                email = req['email'],
                nativeLanguage = req['native_language'])
            user.set_password(req['password'])
            user.save()

            response = {
                'token':'ok',
                'message':'new user is registered'
            }
        except:
            response = {
                'token':'not ok',
                'message':'no register'
            }
            
        return Response(response)


class GuestView(APIView):
    def post(self,request):
        return Response({
            'token':'expected_token',
            'message':'server not available'
        })