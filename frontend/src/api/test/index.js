import parameters from '../parameters';
import axios from 'axios';
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const get_prof_test = async (token, language) => {

  console.log(language);

  return await axios
    .get(parameters.apiUrl+'/search/',
      {
        params: {
          language,
          type: 'proficiency',
        },
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Token '+token,
        },
        timeout: 10000,
      }
    )
    .then(response => response.data[0])
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
