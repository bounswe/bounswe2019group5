import parameters from '../parameters';
import axios from 'axios';
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const get_prof_test = async (token, language) => {

  return await axios
    .get(parameters.apiUrl+'/user/proficiency',
      {
        params: {
          language,
        },
        headers: {
          'Content-Type':'application/json',
          "Authorization": "Token 4024b84ebf75573413c27b1eab3735525aca827a",
        },
        timeout: 10000,
      }
    )
    .then(response => response.data)
    .catch(err => 
      {
        return {
          message: err.response? err.response.data.message : 'Connection Error!',
        };
      }
    );

};

export const get_test_result = async (token, test, answers) => {
  await timeout(500);
  const trueOptions = [];
  const statusOfAnswers = [];
  
  test.questions.map(question => {
    trueOptions.push(question.answer);
    statusOfAnswers.push(false);
  });

  const result = {
    nuOfTrueAnswers: 0,
    nuOfFalseAnswers: 0,
    statusOfAnswers
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
