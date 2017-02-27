var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();

//View engine : in which folder to look for views
app.set('views',path.join(__dirname,'views')); 
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

//set Routes
app.use('/',index);

//Todos route go - URL to communicate with backend
app.use('/api/v1/',todos);

//server to listen to port
app.listen(3000,function(){
    console.log('Server started on port 3000');
}); 