// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.json());

//set up port
var port = process.env.PORT || 8080;

//dummy endpoint as example
app.get('/', function(req, res) {
    res.json({ message: 'high 5 to group 5' });   
});

app.post('/', function(req, res) {
    res.json({ message: 'high 5 to group 5' });   
});


app.listen(port);

