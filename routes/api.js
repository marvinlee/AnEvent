var express = require('express');
var router = express.Router();

var Event = require('../models/event');
var User = require('../models/user');

	//localhost:3000/api/getAllUser
	router.get('/getAllUser', function(req, res){
		
		User.find({}, function(err, docs){
			console.log('got User');
			console.log(docs.data);

        	res.send(docs);
		})
	});
	
	//localhost:3000/api/event
	router.get('/event', function(req, res){
		//res.send("api works");
		Event.find({}, function(err, docs){
			console.log('got Event');
			console.log(docs.data);

        	res.send(docs);
    	});
	});

	//localhost:3000/api/event:event_id
	router.get('/event/:event_id', function(req, res){
		console.log('got Event');
		console.log('Event id = ' + req.params.event_id);
		//res.send("api works");
		Event.findById(req.params.event_id, function(err, docs){
			console.log('got Event');
			console.log(docs.data);

        	res.send(docs);
    	});
	});

	router.delete('/event/remove/:event_id', function(req, res){
		//res.send("api works");
		console.log('req.body.event_id = ' + req.params.event_id);
		//console.log('req.event_id = ' + req.event_id);
		//console.log('req.event_id = ' + JSON.stringify(req));
		Event.remove({_id: req.params.event_id}, function(err, docs){
			console.log('removed Event');
			console.log(docs.data);
			if(err){
				res.send({success: false});
			}else{
				res.send({success: true, message: 'Successful delete event'});
			}
        	//res.send(docs);
    	});
    	//res.send({success:false});
	});
	
	router.post('/event/new', function(req, res){
		//res.send("api works");
		var event = new Event();
		event.name = req.body.name;
		event.date = req.body.date;
		event.location = req.body.location;
		event.type = req.body.type;
		event.desc = req.body.desc;
		event.organizer.organizationname = req.body.organizer.organizationname;
		event.organizer.personname = req.body.organizer.personname;
		event.organizer.email = req.body.organizer.email;
		event.organizer.contact = req.body.organizer.contact;
		event.organizer.mobilecontact = req.body.organizer.mobilecontact;
		event.status = 'Waiting for approval by Admin';
		console.log('event data' + JSON.stringify(req.body));
		
		event.save(function(err){
			if(err){
					res.json({success: false, message: 'Event name existed'});
					
				}else{
					res.json({success: true, message: 'Event created'});
					
				}
			});
	});
	

module.exports = router;
