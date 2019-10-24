import parameters from "../parameters";
import axios from "axios";
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const get_vocabulary_test = async (token, language) => {
  return await axios
    .get(
      parameters.apiUrl +
        "/user/proficiency" /*user/exercises/vocabulary  aslında olacak olan bu*/,
      {
        params: {
          language
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 4024b84ebf75573413c27b1eab3735525aca827a"
        },
        timeout: 10000
      }
    )
    .then(response => response.data)
    .catch(err => {
      return {
        message: err.response ? err.response.data.message : "Connection Error!"
      };
    });
};
/*
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
  console.log("VOCABULARYGETTESTRESULT");
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
*/
