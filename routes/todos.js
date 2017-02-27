var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://mourya:mourya123@ds161059.mlab.com:61059/meantodolistappdb',['todos']);

function checkDb()
{
    db.on('error', function() {
        console.log('error connecting to meantodolistappdb ..changed to meantodolistappdatabase');
        db = mongojs('mongodb://mourya:mourya123@ds145359.mlab.com:45359/meantodolistappdatabase',['todos']);
    });
}
//Get all todos
router.get('/todos',function(req,res,next){
    checkDb();
    
    //where we work with Mongo fetch and output data here for client side angular
    db.todos.find(function(err,todos){
        if(err)
        {
            if(err)
            res.send(err);
        }
        else
        {
            res.json(todos);
        }
    });
});

//Get single todos
router.get('/todo/:id',function(req,res,next){
   checkDb();
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    },function(err,todo){
         if(err)
        {
            res.send(err);
        }
        else
        {
            res.json(todo);
        }
    });
});

//save a todo
router.post('/todo',function(req,res,next){
    checkDb();
    //coming from a body
    var todo = req.body;
    //validation
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid data"
        });
    }
    else
    {
        db.todos.save(todo,function(err,result){
            if(err){
                res.send(err)
            }
            else{
                res.json(result);
            }
        });
    }
});

//update Todo
router.put('/todo/:id',function(req,res,next){
    //coming from a body
     checkDb();
    var todo = req.body;
    var updObj = {};

    if(todo.isCompleted==true)
    {
        updObj.isCompleted=todo.isCompleted;
    }
    if(todo.text){
        updObj.text = todo.text;
    }
    //validation
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid data"
        });
    }
    else
    {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        },updObj,{},function(err,result){
             if(err){
                res.send(err)
            }
            else{
                res.json(result);
            }
        });
    }
});

//Delete todos
router.delete('/todo/:id',function(req,res,next){
    checkDb();
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    },'',function(err,result){
        if(err){
            res.send(err)
        }
        else{
            res.json(result);
        }
    });
});

module.exports = router;