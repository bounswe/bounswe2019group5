// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

//set up port
var port = process.env.PORT || 8080;

//dummy endpoint as example
app.get('/', function(req, res) {
    res.json({ message: 'high 5 to group 5' });   
});

app.post('/', function(req, res) {
    res.json({ message: 'high 5 to group 5' });   
});

app.post('/deneme', function(req, res) {
    res.send({ message: 'req.body' });   
});

app.get('/home', function(req, res) {
    var pair_example = [
        { name: 'cat', id: '42' },
        { name: 'vegi', id: '33' },
        { name: 'plane', id: '68' }];
    res.send(pair_example);   
});

app.post('/exercise',function(req,res){
    var exercise_example = {
        exerciseId: {
            0: {
                imageUrl :'question 1 url is here',
                A:'cat',
                B:'dog',
                C:'plane',
                D:'whale'
            },
            1:{
                imageUrl:'question 2 url is here',
                A:'cat',
                B:'dog',
                C:'plane',
                D:'whale'
            }
        }};
    res.send(exercise_example);
});


app.listen(port);
console.log('listen on 8080');
