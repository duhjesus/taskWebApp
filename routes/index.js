//include express and use the express router
var express =require('express');
var router = express.Router();

//set the route for the home page and will accept a get request
//route callback functions will take a request, response, and next
router.get('/', function(req, res, next){
    res.render('index.html'); // display route/ template
});

//export this to access from other files
module.exports =router;