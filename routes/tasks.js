// main route api
//include express and use the express router
var express =require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://duhjesus:duhjesus1@ds147942.mlab.com:47942/mydatabase_duhjesus',['tasks']);
 // db obj
//route callback functions will take a request, response, and next
// request Getting all tasks from api
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err,tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});
//get request a single task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//save tasks w/ Post request
router.post('/task',function(req,res,next){
    //get task from form
    var task = req.body;
    if (!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    }
    else{
        db.tasks.save(task,function(err,task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }

});
//delete request a single task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});
//Update: Put request a single task( updating data already on the server)
router.put('/task/:id', function(req, res, next){
    var task =req.body;
    var updatedTask = {};
    if(task.isDone){
        updatedTask =task.isDone;
    }
    if(task.title){
        updatedTask.title = task.title;
    }
    if(!updatedTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
    else{ //query
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updatedTask,{}, function(err,task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }

});
//export this to access from other files
module.exports =router;