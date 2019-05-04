var oxfordApi = require('./getDataFromOxfordApi');
var wikiData = require('./getDataFromWikiData');

//oxfordApi.createRequestsForOxfordApi('en','book',(item) => {oxfordApi.sendRequestForOxfordApi(item);});

var renderedArray = wikiData.generateRenderedArray();
var wordArray = [];
setTimeout(() => {

    renderedArray.forEach(element => {

        setTimeout(() => {
            oxfordApi.createRequestsForOxfordApi('en', element.name, element.imgUrl, (item) => {
                oxfordApi.sendRequestForOxfordApi(item, function (wordObject) {
                    wordArray.push(wordObject);

                });
            })

        }, 200);
    });
}, 2000);


setTimeout(() => {

    console.log(wordArray);

}, 7000);

function sendDataToLocalServer(callback) {
    var server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(renderedArray));
    })

    setTimeout(() => {
        server.listen(3000, '127.0.0.1');
    }, 3000);
}
