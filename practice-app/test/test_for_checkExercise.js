const assert = require('chai').assert;
const getExerciseAnswers = require('../libs/checkExercise').getExerciseAnswers;
const checkExercise = require('../libs/checkExercise').checkExercise;

describe('checkExercise() and getExerciseAnswers() are tested', function(){
    it('should be equal to the feedbackInfo and also be a string', async () =>{
        var promise = getExerciseAnswers(1);
        answers = {};
        await Promise.resolve(promise)
        .then(res => answers = res)
        .catch(error => console.log(error));
        
        let feedbackInfo = ['unidentified flying object','autorickshaw','mountain bike','bookmobile'];

        assert.equal(answers.answer1,feedbackInfo[0]);
        assert.equal(answers.answer2,feedbackInfo[1]);
        assert.equal(answers.answer3,feedbackInfo[2]);
        assert.equal(answers.answer4,feedbackInfo[3]);

        assert.typeOf(answers.answer1,'string');
        assert.typeOf(answers.answer2,'string');
        assert.typeOf(answers.answer3,'string');
        assert.typeOf(answers.answer4,'string');

        let callBackFunc = function (item){
            return item;
        }
        var promise2 = checkExercise(1,feedbackInfo,callBackFunc);
        respondedItem = {};
        await Promise.resolve(promise2)
        .then(res => respondedItem = res)
        .catch(error => console.log(error));
                 
    });
    

});