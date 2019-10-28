from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from ..models import User, Language, Comment

root = ''


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

    def test_successful_email(self):
        req = {
            'email_username': 'adaLovelace@email.com',
            'password': 'isa21-ad'
        }
        response = self.client.post(root + '/login/', req)
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertTrue('token' in response.data.keys())

    def test_successful_username(self):
        req = {
            'email_username': 'ada21',
            'password': 'isa21-ad'
        }
        response = self.client.post(root + '/login/', req)
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertTrue('token' in response.data.keys())

    def test_user_not_found(self):
        req = {
            'email_username': 'david',
            'password': 'gHGG-jhj23'
        }
        response = self.client.post(root + '/login/', req)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue('token' not in response.data.keys())

    def test_missing_field(self):
        req = {
            'email_username': 'frederick_31',
            'password': 'gHGG-jhj23'
        }
        for key in req:
            deficient_req = {**req}
            del deficient_req[key]
            response = self.client.post(root + '/login/', deficient_req)
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertTrue('token' not in response.data.keys())

        response = self.client.post(root + '/login/', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('token' not in response.data.keys())

    def test_wrong_password(self):
        req = {
            'email_username': 'ada21',
            'password': 'gHGG-jhj23'
        }
        response = self.client.post(root + '/login/', req)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertTrue('token' not in response.data.keys())


class RegisterViewTests(APITestCase):
    def test_successful_register(self):
        req = {
            "name": "Ada",
            "surname": "Lovelace",
            "email": "adaLovelace@email.com",
            "username": "ada21",
            "password": "isa21-ad",
            "native_language": "english"
        }
        response = self.client.post(root + '/register/', req)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('token' in response.data.keys())

    def test_missing_field(self):
        req = {
            "name": "Ada",
            "surname": "Lovelace",
            "email": "adaLovelace@email.com",
            "username": "ada21",
            "password": "isa21-ad",
            "native_language": "english"
        }
        for key in req:
            deficient_req = {**req}
            del deficient_req[key]
            response = self.client.post(root + '/register/', deficient_req)
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertTrue('token' not in response.data.keys())
            self.assertTrue('message' in response.data.keys())

        response = self.client.post(root + '/register/', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('token' not in response.data.keys())
        self.assertTrue('message' in response.data.keys())


class ProfileViewTests(APITestCase):
    def setUp(self):
        # 1 lang, 2 users and 1 comment is added in setup
        data = {
            'language': 'turkish'
        }
        lang = Language(**data)
        lang.save()

        data = {
            'username': 'ada21',
            'first_name': 'Ada',
            'last_name': 'Lovelace',
            'email': 'adaLovelace@email.com',
            'native_language': 'english',
        }
        user = User(**data)
        user.set_password('isa21-ad')
        user.save()
        user.attended_langs.add(lang)
        user.save()

        data = {
            'username': 'alan1',
            'first_name': 'Alan',
            'last_name': 'Turing',
            'email': 'alanTuring@email.com',
            'native_language': 'english',
        }
        user = User(**data)
        user.set_password('turing123')
        user.save()
        user.attended_langs.add(lang)
        user.save()

        data = {
            'username': 'ada21',
            'comment': 'good user',
            'rate': 4,
        }

        comment = Comment(**data, commented_user=user)
        comment.save()

    def test_self_profile(self):
        user = User.objects.get(username='ada21')
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        response = self.client.get(root + '/profile/ada21/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_other_profile(self):
        user = User.objects.get(username='ada21')
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        response = self.client.get(root + '/profile/alan1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
