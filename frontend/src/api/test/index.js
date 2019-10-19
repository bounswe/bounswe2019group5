import parameters from '../parameters';
import axios from 'axios';
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const get_prof_test = async (token = null, language = 'en') => {

  await timeout(1200);
  return {
      id: 1247828,
      language: "english",
      questions: [
        {
            id: 1,
            text: language+" This is the first question. What is the answer?",
            question_options: [
                {
                  text: "This is the first",
                },
                {
                  text: "This is the second",
                },
                {
                  text: "This is the third",
                },
                {
                  text: "This is the fourth",
                },
            ],
        },

        {
          id: 2,
          text: language+" This is the second question. What is the answer?",
          question_options: [
              {
                text: "This is the first",
              },
              {
                text: "This is the second",
              },
              {
                text: "This is the third",
              },
              {
                text: "This is the fourth",
              },
          ],
        },

        {
          id: 3,
          text: language+" This is the third question. What is the answer?",
          question_options: [
              {
                text: "This is the first",
              },
              {
                text: "This is the second",
              },
              {
                text: "This is the third",
              },
              {
                text: "This is the fourth",
              },
          ],
        },

        {
          id: 4,
          text: language+" This is the fourth question. What is the answer?",
          question_options: [
              {
                text: "This is the first",
              },
              {
                text: "This is the second",
              },
              {
                text: "This is the third",
              },
              {
                text: "This is the fourth",
              },
          ],
        },

        {
          id: 5,
          text: language+" This is the fifth question. What is the answer?",
          question_options: [
              {
                text: "This is the first",
              },
              {
                text: "This is the second",
              },
              {
                text: "This is the fifth",
              },
              {
                text: "This is the fourth",
              },
          ],
        },
      ],
    };

  const data = await axios
    .get(parameters.apiUrl+'/user/proficiency',
      {
        language,
      },
      {
        headers: {'Content-Type':'application/json'},
        Authorization: 'Token '+token,
        timeout: 3000,
      }
    )
    .then(response => response.data)
    .catch(err => 
      {
        console.log(err.message);
        return {
          token: null,
          message: err.response? err.response.data.message : 'Connection Error!',
        };
      }
    );

  console.log("PROFTESTSORGU\n"+data);
};

export const get_test_result = async (token, testId, answers) => {
  await timeout(500);
  const trueOptions = ['This is the first', 'This is the second', 'This is the third', 'This is the fourth', 'This is the fifth',];
  const result = {
    nuOfTrueAnswers: 0,
    nuOfFalseAnswers: 0,
    statusOfAnswers: [false, false, false, false, false]
  };
  console.log("GETTESTRESULT"+answers);
  for (let i = 0; i < answers.length; i++) {
    result.statusOfAnswers[i] = answers[i] === trueOptions[i];
    if (answers[i] === trueOptions[i]) {
      result.nuOfTrueAnswers++;
    } else {
      result.nuOfFalseAnswers++;
    }
  }
  console.log(result);
  return result;
};

/*
export const get_prof_test = async (token = null) => {
    await timeout(1200);
    return {
      testQuestions: [
        {
          questionAnswer: "This is the first",
          questionText: "This is the first question. What is the answer?",
          questionOptions: [
              "This is the first",
              "This is the second",
              "This is the third",
              "This is the fourth",
          ]
        },
  
        {
          questionAnswer: "This is the second",
          questionText: "This is the second question. What is the answer?",
          questionOptions: [
              "This is the first",
              "This is the second",
              "This is the third",
              "This is the fourth",
          ]
        },
  
        {
          questionAnswer: "This is the third",
          questionText: "This is the third question. What is the answer?",
          questionOptions: [
              "This is the first",
              "This is the second",
              "This is the third",
              "This is the fourth",
          ]
        },
  
        {
          questionAnswer: "This is the fourth",
          questionText: "This is the fourth question. What is the answer?",
          questionOptions: [
              "This is the first",
              "This is the second",
              "This is the third",
              "This is the fourth",
          ]
        },
  
        {
          questionAnswer: "This is the fifth",
          questionText: "This is the fifth question. What is the answer?",
          questionOptions: [
              "This is the first",
              "This is the second",
              "This is the fifth",
              "This is the fourth",
          ]
        }
      ]
    };
  };*/