var http = require("https");
var wikiData = require('./getDatafromWikiData');
var oxfordApi = require('./getDatafromOxfordApi');
var util = require('util')

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
    var db = require('./connectToDatabase.js')
    var sql = "INSERT INTO Test ( answer1, answer2, answer3, answer4) values (?,?,?,?)"
    return new Promise((resolve, reject) => {
        db.query(sql, answers, function (err, result) {
            if (err) throw err;
            console.log("row inserted to table");
            sql = "SELECT LAST_INSERT_ID()"
            db.query(sql, function (err2, result2) {
                if (err2) throw err2;
                resolve(JSON.parse(JSON.stringify(result2))[0]['LAST_INSERT_ID()']);
                console.log("row inserted to table");
                db.end();
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
                B: secondQuestion[0],
                C: thirdQuestion[0],
                D: fourthQuestion[0],

            },
            {
                imageUrl: images[1],
                A: firstQuestion[1],
                B: secondQuestion[1],
                C: thirdQuestion[1],
                D: fourthQuestion[1],

            },
            {
                imageUrl: images[2],
                A: firstQuestion[2],
                B: secondQuestion[2],
                C: thirdQuestion[2],
                D: fourthQuestion[2],

            },
            {
                imageUrl: images[3],
                A: firstQuestion[3],
                B: secondQuestion[3],
                C: thirdQuestion[3],
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
