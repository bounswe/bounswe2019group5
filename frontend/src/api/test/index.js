function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const get_prof_test = async (
    token=null
) => {
    await timeout(1200);
    return {
        testId: "1247828", 
        testName: "Example Prof Test",
        nuOfQuestions: 5,
        questions: [
            {
                questionId: "asd12ejd",
                questionName: "Question 1",
                questionText: "This is the first question. What is the answer?",
                options: [
                    {
                        optionName: "A",
                        optionText: "This is the first",
                    },
                    {
                        optionName: "B",
                        optionText: "This is the second",
                    },
                    {
                        optionName: "C",
                        optionText: "This is the third",
                    },
                    {
                        optionName: "D",
                        optionText: "This is the fourth",
                    },
                ],
            },

            {
                questionId: "sa1212ejd",
                questionName: "Question 2",
                questionText: "This is the second question. What is the answer?",
                options: [
                    {
                        optionName: "A",
                        optionText: "This is the first",
                    },
                    {
                        optionName: "B",
                        optionText: "This is the second",
                    },
                    {
                        optionName: "C",
                        optionText: "This is the third",
                    },
                    {
                        optionName: "D",
                        optionText: "This is the fourth",
                    },
                ],
            },

            {
                questionId: "qjsd12ejd",
                questionName: "Question 3",
                questionText: "This is the third question. What is the answer?",
                options: [
                    {
                        optionName: "A",
                        optionText: "This is the first",
                    },
                    {
                        optionName: "B",
                        optionText: "This is the second",
                    },
                    {
                        optionName: "C",
                        optionText: "This is the third",
                    },
                    {
                        optionName: "D",
                        optionText: "This is the fourth",
                    },
                ],
            },

            {
                questionId: "all13as",
                questionName: "Question 4",
                questionText: "This is the fourth question. What is the answer?",
                options: [
                    {
                        optionName: "A",
                        optionText: "This is the first",
                    },
                    {
                        optionName: "B",
                        optionText: "This is the second",
                    },
                    {
                        optionName: "C",
                        optionText: "This is the third",
                    },
                    {
                        optionName: "D",
                        optionText: "This is the fourth",
                    },
                ],
            },

            {
                questionId: "asl13as",
                questionName: "Question 5",
                questionText: "This is the fifth question. What is the answer?",
                options: [
                    {
                        optionName: "A",
                        optionText: "This is the first",
                    },
                    {
                        optionName: "B",
                        optionText: "This is the second",
                    },
                    {
                        optionName: "C",
                        optionText: "This is the fifth",
                    },
                    {
                        optionName: "D",
                        optionText: "This is the fourth",
                    },
                ],
            },

        ],
    };
}

export const get_test_result = async (
    token,
    testId,
    answers
) => {
    await timeout(500);
    const trueOptions = ["A", "B", "C", "D", "C"];
    const result = {
        nuOfQuestions: 5,
        nuOfTrueAnswers: 0,
        nuOfFalseAnswers: 0,
        statusOfAnswers: [false, false, false, false, false],
    };
    Array(answers).forEach( (element, index) => {
        result.statusOfAnswers[index] = (element == trueOptions[index]);
        if ((element == trueOptions[index]))
        {
            result.nuOfTrueAnswers++;
        }
        else
        {
            result.nuOfFalseAnswers++;
        }
    });
    return result;
}