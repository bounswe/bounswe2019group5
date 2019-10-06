from rest_framework.test import APITestCase
from django.urls import reverse

class LoginViewTests(APITestCase):
    def test_email_not_found(self):
        request = {
            "email":"string",
            "password":"string"
        }
        expected_response = {
                'token':'not ok',
                'message':'1'
        }
        
        response = self.client.post('/user/login',request)
        self.assertEqual(4, 4)
        

class RegisterViewTests(APITestCase):
    def test_no_username(self):
        pass
class GuestViewTests(APITestCase):
    def test_is_token_valid(self):
        pass