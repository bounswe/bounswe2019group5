from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class LoginViewTests(APITestCase):
    def test_email_not_found(self):
    
        req = {
            'email':'notFound@boun.com',
            'password':'gHGG-jhj23'
        }
        response = self.client.post('/user/login',req)
        
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
    
    def test_username_not_found(self):
    
        req = {
            'user_name':'frederick_31',
            'password':'gHGG-jhj23'
        }
        response = self.client.post('/user/login',req)
        
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
    
    def test_email_not_valid(self):
    
        req = {
            'email':'notValidEmailForm',
            'password':'gHGG-jhj23'
        }
        response = self.client.post('/user/login',req)
        
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

    def test_missing_field(self):
        req = {
            'user_name':'frederick_31',
            'email':'notFound@boun.com',
            'password':'gHGG-jhj23'
        }
        for key in req:
            deficient_req = {**req}
            del deficient_req[key]
            response = self.client.post('/user/login',deficient_req)
            self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

class RegisterViewTests(APITestCase):
    def test_no_username(self):
        pass
class GuestViewTests(APITestCase):
    def test_is_token_valid(self):
        pass