// call the packages we need
var getWordsOfAClass = require('./libs/create-exercise');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var checkExercise = require('./libs/checkExercise');
var cors = require('cors');

var mysql      = require('mysql');
var key = require('./credentials/key.json');


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

app.get('/home', async function(req, res) {

    var promise = getLabelsFromDatabase();
    answers = {};
    await Promise.resolve(promise)
    .then(res => answers = res)
    .catch(error => console.log(error));
    
    console.log(JSON.parse(JSON.stringify(answers)))


    //Change the key names in aligned with frontend
    var myList = [];
    for(i = 0;i< answers.length;i++){
        obj = {};
        obj['name'] = answers[i]['class_label'];
        obj['id'] = answers[i]['class_id'];
        myList.push(obj);
    }
    var pair_example = myList;
    res.send(pair_example);  
    /* This is format which is to be sent to frontend
    var pair_example = [
        { name: 'vehicle', id: 'Q42889' },
        { name: 'animal', id: 'Q729' },
        { name: 'plant', id: 'Q756' }];*/ 
});

//gets all the class_ids and class_labels from the database
async function getLabelsFromDatabase(){

    var connection = mysql.createConnection(key);

    var db = connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");    
    } else {
        console.log(err);    
    }
    });
    var sql = 'SELECT class_label, class_id FROM Class_Table';
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) throw err;
            resolve(result);
        }).on('error', function(e) {
            reject(e.message);
        });
    }); 
}

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
