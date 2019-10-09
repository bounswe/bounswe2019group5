from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from .models import User


class ProficiencyTest(APITestCase):
    def setUp(self):
        q = {
            "questionLevel": "A2",
            "questionType": "vocab",
            "questionId": "asd12ejd",
            "questionAnswer": "bring",
            "questionText": "to take or carry someone or \
                something to a place or a person, or \
                in the direction of the person speaking",
            "questionOptions": [
                "bring",
                "catch",
                "follow",
                "burn"
            ],
        }
        question = Question.objects.create(**q)

        self.req = {
            "testLanguage": "english",
        }

    def test_number_of_question(self):
        
        response = self.client.post('/profiency', self.req)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data.get('testQuestions')), 6)

    def test_number_of_question_options(self):
        
        response = self.client.post('/profiency', self.req)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        numberOfQuestions = len(response.data.get('testQuestions'))
        for i in range(numberOfQuestions):
            self.assertEqual(
                len(response.data.get('testQuestions')[i].get('questionOptions')),
                4)

    def test_answer_in_options(self):

        response = self.client.post('/profiency', self.req)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        numberOfQuestions = len(response.data.get('testQuestions'))
        for i in range(numberOfQuestions):
            options = response.data.get('testQuestions')[i].get('questionOptions')
            answer = response.data.get('testQuestions')[i].get('questionAnswer')
            self.assertTrue(answer in options)
            options.remove(answer)
            self.assertTrue(not answer in options)
  



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


class RegisterViewTests(APITestCase):
    def test_succesful_register(self):
        req = {
            "name": "Ada",
            "surname": "Lovelace",
            "email": "adaLovelace@email.com",
            "username": "ada21",
            "password": "isa21-ad",
            "native_language": "english"
        }
        response = self.client.post('/user/register', req)
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
            response = self.client.post('/user/register', deficient_req)
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertTrue(not 'token' in response.data.keys())
            self.assertTrue('message' in response.data.keys())

        response = self.client.post('/user/register', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(not 'token' in response.data.keys())
        self.assertTrue('message' in response.data.keys())


class GuestViewTests(APITestCase):
    def test_is_token_valid(self):
        pass
