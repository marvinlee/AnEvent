var express = require('express');
var router = express.Router();

var Event = require('../models/event');
var User = require('../models/user');


	
	router.post('/users', function(req, res){
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
			res.send('Ensure username, password and email were provided');
		} else {
			user.save(function(err){
				if(err){
					res.send('Username or email existed');
				}else{
					res.send('User created');
				}
			});
		}
	});
	

	router.get('/event', function(req, res){
		console.log('got Event');
		//res.send("api works");
		Event.find({}, function(err, docs){
			console.log('got Event');
			console.log(docs.data);

        	res.send(docs);
    	});
	});

	router.put('/event/:event_id', function(req, res){
		console.log('got Event');
		//res.send("api works");
		Event.findById(req.params.event_id, function(err, docs){
			console.log('got Event');
			console.log(docs.data);

        	res.send(docs);
    	});
	});
	

module.exports = router;