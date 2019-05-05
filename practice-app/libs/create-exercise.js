var http = require("https");
var wikiData = require('./getDatafromWikiData');
var oxfordApi = require('./getDatafromOxfordApi');
var util = require('util')


async function getWordsOfAClass(classId) {
    var wikiDataArray = await wikiData.generateRenderedArray(classId)
    var wordObjects = await getWordObjectsFromOxfordApi(wikiDataArray);
    return wordObjects;
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
    //console.log(resultArray);
    return resultArray;
}


function insertAnswers(answers, callback) {
    var db = require('./connectToDatabase.js')
    var sql = "INSERT INTO Test ( answer1, answer2, answer3, answer4) values (?,?,?,?)"
    db.query(sql, answers, function (err, result) {
        if (err) throw err;
        console.log("row inserted to table");
        sql = "SELECT LAST_INSERT_ID()"
        db.query(sql, function (err2, result2) {
            if (err2) throw err2;
            callback(JSON.parse(JSON.stringify(result2))[0]['LAST_INSERT_ID()']);
            console.log("row inserted to table");
            db.end();
        })
    });
}

categoryID = 'Q42889';

function createExercise(wordArray) {

    var images = [];
    var firstQuestion = [];
    var secondQuestion = [];

    var thirdQuestion = [];
    var fourthQuestion = [];


    var id = '5'; // LOOK LATER

    wordArray.slice(0, 4).forEach((element, index) => {
        if (index % 4 === 0) {

            images.push(element.image);

        }

        firstQuestion.push(element.word);
    });

    wordArray.slice(4, 8).forEach((element, index) => {
        if (index % 4 === 0) {
            images.push(element.image);
        }

        secondQuestion.push(element.word);


    });

    wordArray.slice(8, 12).forEach((element, index) => {

        if (index % 4 === 0) {

            images.push(element.image);

        }

        thirdQuestion.push(element.word)


    });
    wordArray.slice(12, 16).forEach((element, index) => {

        if (index % 4 === 0) {

            images.push(element.image);

        }

        fourthQuestion.push(element.word)


    });
    var object = {
        exerciseId :id,
        questions : [
            {
                imageUrl:images[0],
                A:firstQuestion[0],
                B:secondQuestion[0],
                C:thirdQuestion[0],
                D:fourthQuestion[0],

            },
            {
                imageUrl:images[1],
                A:firstQuestion[1],
                B:secondQuestion[1],
                C:thirdQuestion[1],
                D:fourthQuestion[1],

            },
            {
                imageUrl:images[2],
                A:firstQuestion[2],
                B:secondQuestion[2],
                C:thirdQuestion[2],
                D:fourthQuestion[2],

            },
            {
                imageUrl:images[3],
                A:firstQuestion[3],
                B:secondQuestion[3],
                C:thirdQuestion[3],
                D:fourthQuestion[3],

            },

        ]

    }

    console.log(object)


}

//insertAnswers(['x', 'b','c', 'd'],(x)=>{console.log("Last inserted Test ID: ",x)});

getWordsOfAClass(categoryID).then(res => createExercise(res));
