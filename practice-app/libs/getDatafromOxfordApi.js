var http = require("https");

async function createRequestsForOxfordApi(language, word, image) {
    var app_id = "19e47e6a";
    var app_key = "fe3a8b213eb6530d02e4b86288425022";

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
    return options;
};

function sendRequestForOxfordApi(optionsParameters) {
    var parameters = optionsParameters.parameters || '';
    var word = optionsParameters.word || '';
    return new Promise((resolve, reject) => {
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
                    //console.log(wordObject);
                    resolve(wordObject)
                } else {
                    resolve(false);
                }
            });
        }).on('error', function(e) {
            reject(e.message);
        });
    });
    
}
module.exports.createRequestsForOxfordApi = createRequestsForOxfordApi;
module.exports.sendRequestForOxfordApi = sendRequestForOxfordApi;
