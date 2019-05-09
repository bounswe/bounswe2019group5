var axios = require('axios');
var querystring = require('querystring');
var key = require('../credentials/key.json');
var mysql      = require('mysql');
var wikiData = require('./getDatafromWikiData');

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
            resolve('item inserted');
        }).on('error', function(e) {
            reject(e.message);
        });
    }); 
}

//This function returns items from wikidata which has 16 or more subclasses
async function getter(item_num){
    var t=1;
    for(i = 0;i < item_num;i++){

        var custom_class_id = 'Q' + t.toString();

        //var array = await generateRenderedArray(custom_class_id);
        var array = await wikiData.generateRenderedArray(custom_class_id);


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


getter(10);

module.exports.getter = getter;
module.exports.wiker = wiker;
module.exports = insertClass = insertClass;


