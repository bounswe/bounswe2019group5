from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from ..models import Exercise, Question, User


class ExerciseTest(APITestCase):

    def setUp(self):
        exercise_data = {
            "language": "turkish",
            "level": "A1",
            "type": "vocabulary"
        }
        exercise = Exercise(**exercise_data)
        exercise.save()

        question_data = {
            "body": "hangisi dorudur?",
            "answer": "doru",
            'options': ['doru', 'wrong', 'wrong', 'wrong', 'wrong']
        }
        question = Question(**question_data, exam=exercise)
        question.save()

        data = {
            'username': 'ada21',
            'first_name': 'Ada',
            'last_name': 'Lovelace',
            'email': 'adaLovelace@email.com',
        }
        user = User(**data)
        user.set_password('isa21-ad')
        user.save()
    
    def test_true_answer(self):
        user = User.objects.get(username='ada21')
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        req = {
            "id": "1",
            "answers": ["doru"]
        }
        response = self.client.post('/result/', req)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
