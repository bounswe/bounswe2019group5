// call the packages we need
var getWordsOfAClass = require('./libs/create-exercise');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var checkExercise = require('./libs/checkExercise');
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
        { name: 'vehicle', id: 'Q42889' },
        { name: 'animal', id: 'Q729' },
        { name: 'plant', id: 'Q756' }];
    res.send(pair_example);   
});

app.post('/exercise',function(req,res){
    var exercise_example = getWordsOfAClass(req.body.id).then(result => res.send(result));
    /*
    var exercise_example = {
        exerciseId:'id examples',
        questions:[
            {
                imageUrl :'https://iasbh.tmgrup.com.tr/f51394/650/344/0/0/800/420?u=https://isbh.tmgrup.com.tr/sbh/2017/10/30/ruyada-kopek-gormek-ne-anlama-gelir-1509365192223.jpg',
                A:'cat',
                B:'dog',
                C:'plane',
                D:'whale'
            },
            {
                imageUrl:'https://goldenretriever.gen.tr/images/golden-retriever-kokeni.jpg',
                A:'cat',
                B:'dog',
                C:'plane',
                D:'whale'
            }
        ]};
    */
});

app.post('/result',function(req,res){
    //console.log(req.body.responses.answers);
    var exerciseId = req.body.responses.exerciseId;
    var answers = req.body.responses.answers;
    checkExercise(exerciseId, answers, result => res.send(result));
    
});
app.listen(port);
console.log('listen on 8080');
