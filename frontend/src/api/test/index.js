import parameters from '../parameters';
import axios from 'axios';
import { AssertionError } from 'assert';

export const get_prof_test = async (token, language) => {

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

export const get_test_result = async (token, id, answers) => {
  
  let examResult = await axios
        .post(parameters.apiUrl+'/result/',
            {
                id,
                answers,
            },
            {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Token '+token,
                },
                timeout: 10000,
            }
        )
        .then(response => response.data)
        .catch(err => null);
    
  if (!examResult || !examResult.correct_answer)  return null;

  if (examResult.correct_answer.length != answers.length) return null;

  const result = {
    nuOfTrueAnswers: 0,
    nuOfFalseAnswers: 0,
    statusOfAnswers: Array(answers.length),
  };

  for (let i = 0; i < answers.length; i++) {
    result.statusOfAnswers[i] = answers[i] === examResult.correct_answer[i];
    if (answers[i] === examResult.correct_answer[i]) {
      result.nuOfTrueAnswers++;
    } else {
      result.nuOfFalseAnswers++;
    }
  }

  examResult.result = result;

  return examResult;
};
