var http = require("https");
var wikiData = require('./getDatafromWikiData');
var oxfordApi = require('./getDatafromOxfordApi');
var util = require('util')
var mysql      = require('mysql');
var translate = require('./translate').translate;
var key = require('../credentials/key.json');

async function getWordsOfAClass(classId, lang="en") {
    var wikiDataArray = await wikiData.generateRenderedArray(classId);
    console.log(wikiDataArray);
    //Please dont delete this line, we can use later.
    // var wordObjects = await getWordObjectsFromOxfordApi(wikiDataArray);
    var questions = await createExercise(wikiDataArray, lang);
    //console.log(questions);

    return questions;
}

async function getWordObjectsFromOxfordApi(array) {
    var optionArray = [];
    var resultArray = [];
    for (let element of array) {
        var option = await oxfordApi.createRequestsForOxfordApi('en', element.name, element.imgUrl);
        optionArray.push(option);
    }
    var promiseArray = [];
    for (let option of optionArray) {
        const promise = oxfordApi.sendRequestForOxfordApi(option)
            .then((res) => {
                if (res !== false) {
                    resultArray.push(res);
                }
            })
            .catch(error => console.log(error))
        promiseArray.push(promise);
    }
    await Promise.all(promiseArray)
    return resultArray;
}


function insertAnswers(answers) {
    var connection = mysql.createConnection(key);

    connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");    
    } else {
        console.log(err);    
    }
    });
    var sql = "INSERT INTO Test ( answer1, answer2, answer3, answer4) values (?,?,?,?)"
    return new Promise((resolve, reject) => {
        connection.query(sql, answers, function (err, result) {
            if (err) throw err;
            console.log("row inserted to table");
            sql = "SELECT LAST_INSERT_ID()"
            connection.query(sql, function (err2, result2) {
                if (err2) throw err2;
                resolve(JSON.parse(JSON.stringify(result2))[0]['LAST_INSERT_ID()']);
                console.log("row inserted to table");
                
            })
        }).on('error', function(e) {
            reject(e.message);
        });
    }); 
}

categoryID = 'Q42889';

async function createExercise(wordArray, lang="en", numberOfQuestions=4, numberOfOptions=4) {

    if (wordArray.length<numberOfQuestions*numberOfOptions)   return null; // Control sufficiency of data

    //Random Shuffle
    for (var i=wordArray.length-1; i>0; i--) {
        let j = Math.floor( Math.random()*(i+1) );
        let temp = wordArray[i];
        wordArray[i] = wordArray[j];
        wordArray[j] = temp;
    }

    var images = [];
    var questions = [];
    var answerArray = [];

    for (var i=0; i<numberOfQuestions; i++) {
        let randIndex = Math.floor(Math.random()*numberOfOptions);

        for (var index=i*numberOfOptions; index<(i+1)*numberOfOptions; index++) {
            element = wordArray[index];
            var trWord = await translate(element.name, lang);

            if (index % numberOfOptions === randIndex) {
                images.push(element.imgUrl);
                answerArray.push(trWord);
            }
            questions.push(trWord);
        }
        
    }

    var object = {
        questions: [],
    }

    for (var i=0; i<numberOfQuestions; i++) {
        object.questions[i] = {};
        object.questions[i].imageUrl = images[i];
        for (var j=0; j<numberOfOptions; j++)
            object.questions[i][String.fromCharCode('A'.charCodeAt()+j)] = questions[i*numberOfOptions+j];
    }

    var res = await insertAnswers(answerArray)
    object.exerciseId = res;
    console.log("============\n",object,"==========\n",answerArray);
    return object;
}

//getWordsOfAClass('Q42889');
module.exports = {getWordsOfAClass, createExercise};
