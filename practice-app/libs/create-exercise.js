var http = require("https");
var wikiData = require('./getDataFromWikiData');
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
    console.log(resultArray);
    return resultArray;
}

getWordsOfAClass('Q42889').then(res => console.log(res))
