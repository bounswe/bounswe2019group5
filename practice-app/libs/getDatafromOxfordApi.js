var http = require("https");

function createRequestsForOxfordApi(language, word, image, callback) {
    var app_id = "d4ecea1c";
    var app_key = "e18d3e367a757392aa6d916f78c655f1";

    var options = {
        word: word,
        image: image,
        parameters: {
            host: 'od-api.oxforddictionaries.com',
            port: '443',
            path: '/api/v1/entries/' + language + '/' + encodeURI(word) + '/definitions',
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'app_id': app_id,
                'app_key': app_key
            }
        }
    };
    callback(options);
};

function sendRequestForOxfordApi(optionsParameters, callback) {
    var parameters = optionsParameters.parameters || '';
    var word = optionsParameters.word || '';
    http.get(parameters, (resp) => {
        var body = '';
        resp.on('data', (data) => {
            body += data;
        });
        resp.on('end', () => {
            if (body.indexOf('<') !== 0) {
                var parsed = JSON.parse(body || '{}');

                var definition = ((((((((((parsed || {}).results || [])[0] || {}).lexicalEntries || [])[0] || {}).entries || [])[0] || {}).senses || [])[0] || {}).definitions || [])[0] || '';

                var wordImage = optionsParameters.image;
                var wordObject = {
                    'word': word,
                    'definition': definition,
                    'image': wordImage
                };
                callback(wordObject);
            }
        });
    });
}
module.exports.createRequestsForOxfordApi = createRequestsForOxfordApi;
module.exports.sendRequestForOxfordApi = sendRequestForOxfordApi;
