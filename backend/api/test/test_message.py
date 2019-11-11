from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from ..models import *

class MessageTest(APITestCase):

    def setUp(self):
        # 1 lang, 2 users and 1 message is added in setup
        language_data = {
            'language': 'turkish'
        }
        language = Language(**language_data)
        language.save()

        user_data = {
            'username': 'ada21',
            'first_name': 'Ada',
            'last_name': 'Lovelace',
            'email': 'adaLovelace@email.com',
            'native_language': 'english',
        }
        user = User(**user_data)
        user.set_password('isa21-ad')
        user.save()
        user.attended_languages.add(language)
        user.save()

        user_data = {
            'username': 'alan1',
            'first_name': 'Alan',
            'last_name': 'Turing',
            'email': 'alanTuring@email.com',
            'native_language': 'english',
        }
        user = User(**user_data)
        user.set_password('turing123')
        user.save()
        user.attended_languages.add(language)
        user.save()

        message_data = {
            'text': 'this is a cool message',
            'owner': User.objects.get(username='ada21'),
            'username': User.objects.get(username='alan1'),
        }
        message = Message(**message_data)
        message.save()


    def test_message_get(self):
        user = User.objects.get(username='ada21')
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        response = self.client.get('/message/?username=alan1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_message_post(self):
        user = User.objects.get(username='alan1')
        message_data = {
            'username': 'ada21',
            'text': 'helloo, i loved your message. my name is alan :D',
        }
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        response = self.client.post('/message/',message_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_missing_username(self):
        user = User.objects.get(username='alan1')
        message_data = {
            'text': 'sorry I forgot your name... what was it?',
        }
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        response = self.client.post('/message/', message_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_wrong_username(self):
        user = User.objects.get(username='alan1')
        message_data = {
            'username' : 'chomsky35',
            'text': 'hi, who are you? do you exist?',
        }
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        response = self.client.post('/message/', message_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unauthorized_post(self):
        message_data = {
            'username' : 'alan1',
            'text': 'I am such a big fan of yours.',
        }
        response = self.client.post('/message/', message_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
