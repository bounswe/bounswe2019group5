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
    for(let option of optionArray) {
        const promise = oxfordApi.sendRequestForOxfordApi(option)
        .then((res) => {
            if(res !== false) {
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


function insertAnswers(answers, callback){
    var db = require('./connectToDatabase.js')
    var sql = "INSERT INTO Test ( answer1, answer2, answer3, answer4) values (?,?,?,?)"
    db.query(sql, answers ,function (err, result) {
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

function createExercise(wordArray){
 
    var questions = [];

    var words = [];

    var images = [];
    var answers = [];


    wordArray.slice(0,15).forEach((element,index) => {
        
        if(index % 4 === 0){

            images.push(element.image);
            answers.push(element.word)

        }
        words.push(element.word);

    });

    console.log(images);
}

//insertAnswers(['x', 'b','c', 'd'],(x)=>{console.log("Last inserted Test ID: ",x)});

getWordsOfAClass(categoryID).then(res => createExercise(res));
