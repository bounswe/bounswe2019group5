var oxfordApi = require('./getDataFromOxfordApi');
var wikiData = require('./getDataFromWikiData');

//oxfordApi.createRequestsForOxfordApi('en','book',(item) => {oxfordApi.sendRequestForOxfordApi(item);});


var renderedArray = wikiData.generateRenderedArray();
var dataArray = [];
setTimeout(() => {

    renderedArray.forEach(element => {

        setTimeout(() => {
            oxfordApi.createRequestsForOxfordApi('en',element.name,(item) => {oxfordApi.sendRequestForOxfordApi(item);}) 

        }, 200);
    });

}, 3000);


function sendDataToLocalServer() {
    var server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(renderedArray));
    })

    setTimeout(() => {
        server.listen(3000, '127.0.0.1');
    }, 3000);
}

