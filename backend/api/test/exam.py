from rest_framework.test import APITestCase


class ProficiencyTest(APITestCase):

    def setUp(self):
        pass


"""
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


"""
