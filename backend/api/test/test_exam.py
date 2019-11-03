from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from ..models import Exercise, Result, UserExerciseRelation, Question, QuestionOption, User
from ..serializers import ExerciseSerializer


class ExerciseTest(APITestCase):

    def setUp(self):
        exercise_data = {
            "language": "turkish",
            "level" : "A1",
            "type" : "vocabulary"
        }
        exercise = Exercise(**exercise_data)
        
        exercise.save()

        question_data = {
            "text": "hangisi dorudur?",
            "answer" : "doru"
        }
        question = Question(**question_data, exam=exercise)
        question.save()

        question_option_data1 = {
            "text": "doru"
        }
        question_option_data2 = {
            "text": "wrong"
        }
        question_option_data3 = {
            "text": "wrong"
        }
        question_option_data4 = {
            "text": "wrong"
        }
        option1 = QuestionOption(**question_option_data1, question=question)
        option2 = QuestionOption(**question_option_data2, question=question)
        option3 = QuestionOption(**question_option_data3, question=question)
        option4 = QuestionOption(**question_option_data4, question=question)
        option1.save()
        option2.save()
        option3.save()
        option4.save()

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
            "answers" : ["doru"]
        }
        response = self.client.post('/result/', req)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)



class ProficiencyTest(APITestCase):
    def setUp(self):
        pass

'''
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

        response = self.client.post('/proficiency', self.req)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data.get('testQuestions')), 6)

    def test_number_of_question_options(self):

        response = self.client.post('/proficiency', self.req)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        numberOfQuestions = len(response.data.get('testQuestions'))
        for i in range(numberOfQuestions):
            self.assertEqual(
                len(response.data.get('testQuestions')[i].get('questionOptions')),
                4)

    def test_answer_in_options(self):

        response = self.client.post('/proficiency', self.req)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        numberOfQuestions = len(response.data.get('testQuestions'))
        for i in range(numberOfQuestions):
            options = response.data.get('testQuestions')[i].get('questionOptions')
            answer = response.data.get('testQuestions')[i].get('questionAnswer')
            self.assertTrue(answer in options)
            options.remove(answer)
            self.assertTrue(not answer in options)

'''
