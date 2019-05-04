var axios = require('axios');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var renderedArray = [];

var getClassDataFromWikiData = ((classId, callback) => {
    var queryString = `SELECT ?itemLabel (SAMPLE(?item) AS ?item) (SAMPLE(?pic) AS ?pic) WHERE {  ?item wdt:P279 wd:${classId};    wdt:P18 ?pic.  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }}GROUP BY ?itemLabel LIMIT 6`;
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
});

getClassDataFromWikiData('Q42889', (item) => {

    var array = item.results.bindings;
    array.forEach(element => {
        var itemObject = {
            name: element.itemLabel.value,
            imgUrl: element.pic.value
        }

        renderedArray.push(itemObject);
    });

});

var server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(renderedArray));
})

setTimeout(() => {
    server.listen(3000, '127.0.0.1');
}, 3000);

module.exports = getClassDataFromWikiData; 
