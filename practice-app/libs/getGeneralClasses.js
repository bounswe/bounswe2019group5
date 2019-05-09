var axios = require('axios');
var querystring = require('querystring');
//var http = require('http');
//var fs = require('fs');
//const wdk = require('wikidata-sdk')
//var https = require('https')
//var getJSON = require('get-json')
var key = require('../credentials/key.json');
var mysql      = require('mysql');

function getClassDataFromWikiData(classId) {


    var queryString = `SELECT ?itemLabel (SAMPLE(?item) AS ?item) (SAMPLE(?pic) AS ?pic) WHERE {  ?item wdt:P279 wd:${classId};    wdt:P18 ?pic.  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }}GROUP BY ?itemLabel LIMIT 30`;
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

//gets label given a class_id
function wiker(class_id){

    var queryString = `SELECT  *  WHERE {  wd:${class_id} rdfs:label ?label .FILTER (langMatches( lang(?label), "en" ) ) } LIMIT 1`;
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

// inserts a item to the db
async function insertClass(class_id,class_label) {
    var connection = mysql.createConnection(key);

    connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");    
    } else {
        console.log(err);    
    }
    });

    values = [];
    values.push(class_id);
    values.push(class_label);

    var sql = 'INSERT IGNORE INTO Class_Table ( class_id, class_label) values (?,?)';
    return new Promise((resolve, reject) => {
        connection.query(sql, values, function (err, result) {
            if (err) throw err;
            //console.log("row inserted to table");
            resolve('item inserted');
        }).on('error', function(e) {
            reject(e.message);
        });
    }); 
}

//This function returns items from wikidata which has 16 or more subclasses
async function getter(){
    var t=1;
    for(i = 0;i < 10;i++){

        var custom_class_id = 'Q' + t.toString();

        var array = await generateRenderedArray(custom_class_id);
        console.log(custom_class_id + ": " + array.length);
        if(array.length > 16){
            var res = await wiker(custom_class_id);
            var value = res.data.results.bindings[0].label.value;
            await insertClass(custom_class_id, value);
            console.log(value + ' is inserted to DB');
        }
        t = t + 1;
    }
    return;
}


getter();

module.exports.getClassDataFromWikiData = getClassDataFromWikiData;  
module.exports.generateRenderedArray = generateRenderedArray;  


