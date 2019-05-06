var mysql      = require('mysql');
var key = require('../credentials/key.json');



async function checkExercise(exerciseId, givenAnswers, callback) {
    var promise = getExerciseAnswers(exerciseId);
    answers = {};
    await Promise.resolve(promise)
    .then(res => answers = res)
    .catch(error => console.log(error));
    console.log(answers);
    trueAnswers = 0;

    if(answers.answer1 === givenAnswers[0]) {
        trueAnswers = trueAnswers+1;
    }
    if(answers.answer2 === givenAnswers[1]) {
        trueAnswers = trueAnswers+1;
    }
    if(answers.answer3 === givenAnswers[2]) {
        trueAnswers = trueAnswers+1;
    }
    if(answers.answer4 === givenAnswers[3]) {
        trueAnswers = trueAnswers+1;
    }

    falseAnswers = 4 - trueAnswers;
    response = {
        true: trueAnswers,
        false: falseAnswers
    }
    callback(response);

}

function getExerciseAnswers(exerciseId) {
    var connection = mysql.createConnection(key);

    var db = connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");    
    } else {
        console.log(err);    
    }
    });
    var sql = 'SELECT answer1, answer2, answer3, answer4 FROM Test WHERE test_id = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, exerciseId, function (err, result) {
            if (err) throw err;
            resolve(JSON.parse(JSON.stringify(result))[0]);
        }).on('error', function(e) {
            reject(e.message);
        });
    }); 
}
//checkExercise("11", [ 'unidentified flying object', 'ice resurfacer', 'power car', 'rocket' ], res => console.log(res));
//Promise.resolve(promise).then(res => console.log(res));

module.exports = checkExercise;