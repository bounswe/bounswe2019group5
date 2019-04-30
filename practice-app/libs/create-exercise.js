const axios = require('axios');
const querystring = require('querystring');

function getClassDataFromWikiData(classId, callback) {
    const queryString = `SELECT ?item ?itemLabel ?pic WHERE { ?item wdt:P279 wd:${classId} . ?item wdt:P18 ?pic SERVICE wikibase:label { bd:serviceParam wikibase:language "en" } }`;

    const url = 'https://query.wikidata.org/sparql';

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

}

module.exports = getClassDataFromWikiData;