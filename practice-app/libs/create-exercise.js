var http = require("https");
var wikiData = require('./getDatafromWikiData');
var oxfordApi = require('./getDatafromOxfordApi');
var util = require('util')
var mysql      = require('mysql');
var key = require('../credentials/key.json');

async function getWordsOfAClass(classId) {
    var wikiDataArray = await wikiData.generateRenderedArray(classId);
    console.log(wikiDataArray);
    //Please dont delete this line, we can use later.
    // var wordObjects = await getWordObjectsFromOxfordApi(wikiDataArray);
    var questions = await createExercise(wikiDataArray);
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

async function createExercise(wordArray) {

    var images = [];
    var firstQuestion = [];
    var secondQuestion = [];
    var thirdQuestion = [];
    var fourthQuestion = [];
    var id = '5'; // LOOK LATER
    var answerArray = [];

    wordArray.slice(0, 4).forEach((element, index) => {
        if (index % 4 === 0) {

            images.push(element.imgUrl);
            answerArray.push(element.name);
        }

        firstQuestion.push(element.name);
    });

    wordArray.slice(4, 8).forEach((element, index) => {
        if (index % 4 === 0) {
            images.push(element.imgUrl);
            answerArray.push(element.name);
        }

        secondQuestion.push(element.name);
    });

    wordArray.slice(8, 12).forEach((element, index) => {
        if (index % 4 === 0) {
            images.push(element.imgUrl);
            answerArray.push(element.name);
        }
        thirdQuestion.push(element.name)
    });
    wordArray.slice(12, 16).forEach((element, index) => {
        if (index % 4 === 0) {
            images.push(element.imgUrl);
            answerArray.push(element.name);
        }

        fourthQuestion.push(element.name)
    });

    

    var object = {
        exerciseId: id,
        questions: [
            {
                imageUrl: images[0],
                A: firstQuestion[0],
                B: firstQuestion[1],
                C: firstQuestion[2],
                D: firstQuestion[3],

            },
            {
                imageUrl: images[1],
                A: secondQuestion[0],
                B: secondQuestion[1],
                C: secondQuestion[2],
                D: secondQuestion[3],

            },
            {
                imageUrl: images[2],
                A: thirdQuestion[0],
                B: thirdQuestion[1],
                C: thirdQuestion[2],
                D: thirdQuestion[3],

            },
            {
                imageUrl: images[3],
                A: fourthQuestion[0],
                B: fourthQuestion[1],
                C: fourthQuestion[2],
                D: fourthQuestion[3],

            },

        ]
    }

    var idPromise = insertAnswers(answerArray);
    await Promise.resolve(idPromise).then(res=>object.exerciseId = res);
    return object;
}

//getWordsOfAClass('Q42889');
module.exports = getWordsOfAClass;
