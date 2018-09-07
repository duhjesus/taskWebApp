var express = require('express');//brings express in from node modules file
var path = require('path'); //path a system module didnt have to bring in separately
// helps with file system paths
var bodyParser = require('body-parser');

//2 files in a folder index(index or home page) and task(api I'll create to work w/ mongoDB)
var index = require('./routes/index');
var tasks = require('./routes/tasks');

//port for server to listen on
var port =3000;

//main app var
var app = express();

//View Engine
app.set('views',path.join(__dirname,'views'));//folder to use for our views
app.set('view engine','ejs');// ejs is view engine we are specifying
app.engine('html', require('ejs').renderFile);// render files with html extension

//set static folder (angular)
app.use(express.static(path.join(__dirname,'client')));

//body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',index);

//route
app.use('/',index); //index folder
app.use('/api',tasks); //url /api to interact with api

console.log("Hello World!")

//listen to run our server
app.listen(port,function(){
    console.log('Server initiated. Listening on port:'+ port)
});
