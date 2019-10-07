from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from .models import User


class LoginViewTests(APITestCase):
    def setUp(self):
        data = {
            'username': 'ada21',
            'first_name': 'Ada',
            'last_name': 'Lovelace',
            'email': 'adaLovelace@email.com',
        }

        user = User(**data)
        user.set_password('isa21-ad')
        user.save()

    def test_succesful_email(self):
        req = {
            'email_username': 'adaLovelace@email.com',
            'password': 'isa21-ad'
        }
        response = self.client.post('/user/login', req)
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertTrue('token' in response.data.keys())

    def test_succesful_username(self):
        req = {
            'email_username': 'ada21',
            'password': 'isa21-ad'
        }
        response = self.client.post('/user/login', req)
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertTrue('token' in response.data.keys())

    def test_user_not_found(self):

        req = {
            'email_username': 'david',
            'password': 'gHGG-jhj23'
        }
        response = self.client.post('/user/login', req)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(not 'token' in response.data.keys())

    def test_missing_field(self):
        req = {
            'email_username': 'frederick_31',
            'password': 'gHGG-jhj23'
        }
        for key in req:
            deficient_req = {**req}
            del deficient_req[key]
            response = self.client.post('/user/login', deficient_req)
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertTrue(not 'token' in response.data.keys())

        response = self.client.post('/user/login', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(not 'token' in response.data.keys())

    def test_wrong_password(self):
        req = {
            'email_username': 'ada21',
            'password': 'gHGG-jhj23'
        }
        response = self.client.post('/user/login', req)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertTrue(not 'token' in response.data.keys())


# class RegisterViewTests(APITestCase):

class GuestViewTests(APITestCase):
    def test_is_token_valid(self):
        pass
