function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
};

export const get_test_result = async (token, testId, answers) => {
  await timeout(500);
  const trueOptions = ["A", "B", "C", "D", "C"];
  const result = {
    nuOfQuestions: 5,
    nuOfTrueAnswers: 0,
    nuOfFalseAnswers: 0,
    statusOfAnswers: [false, false, false, false, false]
  };
  for (let i = 0; i < answers.length; i++) {
    result.statusOfAnswers[i] = answers[i] === trueOptions[i];
    if (answers[i] === trueOptions[i]) {
      result.nuOfTrueAnswers++;
    } else {
      result.nuOfFalseAnswers++;
    }
  }
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