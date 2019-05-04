var axios = require('axios');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function getClassDataFromWikiData(classId, callback) {
    var queryString = `SELECT DISTINCT ?item ?itemLabel ?pic WHERE { ?item wdt:P279 wd:${classId} . ?item wdt:P18 ?pic SERVICE wikibase:label { bd:serviceParam wikibase:language "en" } }  LIMIT 10`;
    var url = 'https://query.wikidata.org/sparql';

    axios.post(url,
        querystring.stringify({
            query: queryString,
            format: "json"
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) => {
            callback(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
};

function generateRenderedArray() {
    var renderedArray = [];

    getClassDataFromWikiData('Q42889', (item) => {


        var array = item.results.bindings;

        console.log('GENERATE')
        array.forEach(element => {
            var itemObject = {
                name: element.itemLabel.value,
                imgUrl: element.pic.value
            }

            renderedArray.push(itemObject);
        });

    });

    return(renderedArray);
}

module.exports.getClassDataFromWikiData = getClassDataFromWikiData;  
module.exports.generateRenderedArray = generateRenderedArray;  


//module.exports.sendDataToLocalServer = sendDataToLocalServer; 


