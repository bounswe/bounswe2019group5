var http = require("https");
var wikiData = require('./getDataFromWikiData');

function createWordArray(callback) {
    var renderedArray = wikiData.generateRenderedArray();
    setTimeout(() => {
        callback(renderedArray);
    }, 2000);
}

function sendDataToLocalServer(callback) {
    createWordArray((array) => {
        callback(array);
    });
}

sendDataToLocalServer((array) => {
    console.log(array)
    var server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(array);
    });

    server.listen(3000, '127.0.0.1');
});
