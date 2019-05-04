
var http = require("https");
var app_id = "Will be taken from Database";
var app_key = "Will be taken from Database";

var wordId = "mosquito";
var fields = "pronunciations";
var strictMatch = "false";

var options = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
    method: "GET",
    headers: {
        'app_id': app_id,
        'app_key': app_key
    }
};

http.get(options, (resp) => {
    let body = '';
    resp.on('data', (data) => {
        body += data;
    });
    resp.on('end', () => {
        let parsed = JSON.parse(body);

        console.log(parsed.results[0].lexicalEntries[0].pronunciations[0].audioFile);
    });
});
