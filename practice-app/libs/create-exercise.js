var http = require("https");
var wikiData = require('./getDataFromWikiData');
var oxfordApi = require('./getDataFromOxfordApi');

function createWordArray(callback) {
    var renderedArray = wikiData.generateRenderedArray();
    var wordArray = [];
    setTimeout(() => {

        parseEveryWordFromWikiData(renderedArray, (array) => {
            wordArray = array;
        })

        setTimeout(() => {
            console.log(wordArray)
        }, 2000);

        callback(wordArray);
    }, 2000);
}

function parseEveryWordFromWikiData(array, callback) {
    wordArray = [];

    array.forEach(element => {

        setTimeout(() => {
            oxfordApi.createRequestsForOxfordApi('en', element.name, element.imgUrl, (item) => {
                oxfordApi.sendRequestForOxfordApi(item, function (wordObject) {
                    wordArray.push(wordObject);

                });
            })

        }, 200);
    });

    callback(wordArray);

}

function sendDataToLocalServer(callback) {
    createWordArray((array) => {
        callback(array);
    });
}

sendDataToLocalServer((array) => {
    var server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(array);
    });

    server.listen(3000, '127.0.0.1');
});
