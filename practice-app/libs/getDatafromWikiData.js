var axios = require('axios');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function getClassDataFromWikiData(classId) {
    var queryString = `SELECT ?itemLabel (SAMPLE(?item) AS ?item) (SAMPLE(?pic) AS ?pic) WHERE {  ?item wdt:P279 wd:${classId};    wdt:P18 ?pic.  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }}GROUP BY ?itemLabel LIMIT 5`;
    var url = 'https://query.wikidata.org/sparql';

    return axios.post(url,
        querystring.stringify({
            query: queryString,
            format: "json"
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
     });
}

async function generateRenderedArray(classId) {
    var renderedArray = [];
    //'Q42889'
    try {
        var res = await getClassDataFromWikiData(classId);
        var array = res.data.results.bindings;
        array.forEach(element => {
            var itemObject = {
                name: element.itemLabel.value,
                imgUrl: element.pic.value
            }
    
            renderedArray.push(itemObject);
        });
    } catch(error) {
        console.log(error);
    }
    return renderedArray;
}

module.exports.getClassDataFromWikiData = getClassDataFromWikiData;  
module.exports.generateRenderedArray = generateRenderedArray;  

