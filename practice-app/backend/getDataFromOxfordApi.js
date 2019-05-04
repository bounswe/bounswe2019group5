var http = require("https");

function createRequestsForOxfordApi(language, word,image, callback) {
    var app_id = "WILL BE ADDED LATER";
    var app_key = "WILL BE ADDED LATER";
    var options = {
        word: word,
        image:image,
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

function sendRequestForOxfordApi(optionsParameters) {
    var parameters = optionsParameters.parameters || '';
    var word = optionsParameters.word || '';
    var array = [];
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
                array.push({
                    'word': word,
                    'definition': definition,
                    'image':wordImage

                })

                console.log(array);
            }
        });
    });

    
}
module.exports.createRequestsForOxfordApi = createRequestsForOxfordApi;
module.exports.sendRequestForOxfordApi = sendRequestForOxfordApi;  
