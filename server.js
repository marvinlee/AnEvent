//initialize module
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var db = mongojs('eventlist', ['eventlist']);
var usereventdb = mongojs('userevent', ['userevent']);
var userlogindb = mongojs('user', ['user']);
var bodyParser = require('body-parser');
var router = express.Router();
var User = require('./models/user');
//var appRoutes = require('./routes/api')(router);

//bodyparser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use('/api', appRoutes);

//connect with database
mongoose.connect('mongodb://localhost/eventlist', function(err){
    if(err){
        console.log('not connect to database');
    }else{
        console.log('connected to database');
    }
});

//define views folder
app.use(express.static(__dirname + "/public"));

//GET eventlist database data
app.get('/eventlist', function(req, res){
    
    db.eventlist.find(function(err, docs){

    	res.json(docs);

    });
    
});

app.post('/login', function(req, res){
    console.log("get data login");
    var username = req.body.username;
    var password = req.body.password;
    console.log("get data login");
    userlogindb.user.findOne({username: username, password: password},function(err, docs){
        console.log("loging in");
        console.log(docs);
        res.json(docs);

    });
});

app.post('/register', function(req, res){

    /*var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;*/

    userlogindb.user.insert(req.body, function(err, doc){
        console.log("registering to db");
        console.log(doc);
        res.json(doc);
        
    });

   
});

//POST data into eventlist database
app.post('/eventlist', function (req, res){
   
    db.eventlist.insert(req.body, function(err, doc){

    	res.json(doc);

    });

});

//POST user subscribe event to userevent database
app.post('/userevent', function (req, res){
    
    usereventdb.userevent.insert(req.body, function(err, doc){

    	res.json(doc);
    	
    });

});

app.post('/geteventdetail', function(req, res){
    

    db.eventlist.findOne({_id: mongojs.ObjectId(req.body.event_id)},function(err, docs){

    	
    	res.json(docs);

    });
    
});

app.post('/editevent', function (req, res){
   
   console.log("edit req body = " + JSON.stringify(req.body));

    db.eventlist.findAndModify({
    	query: { _id: mongojs.ObjectId(req.body._id) },
    	update: { $set: {
    		name : req.body.name,
    		date : req.body.date,
    		type : req.body.type,
    		desc : req.body.desc, 
    		location : req.body.location,
    		organizer : {	pname : req.body.organizer.pname,
    						oname : req.body.organizer.oname,
    						email : req.body.organizer.email,
    						contact : req.body.organizer.contact,
    						mobilecontact : req.body.organizer.mobilecontact, 
    						desc : req.body.organizer.desc
    					}
    				}
   }}, function (err, doc, lastErrorObject) {
     	
	});
    

});

//start listening page
app.listen(3000);
console.log("Server running on port 3000");