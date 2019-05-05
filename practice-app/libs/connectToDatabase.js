var mysql      = require('mysql');
var key = require('../credentials/key.json');

var connection = mysql.createConnection(key);

var connect = connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log(err);    
}
});

module.exports = connection;