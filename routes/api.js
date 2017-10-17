//event api function
var express = require('express');
var router = express.Router();

var Event = require('../models/event');
var User = require('../models/user');

	
	//localhost:3000/api/getAllUser
	router.get('/getAllUser', function(req, res){
		
		User.find({}, function(err, docs){

        	res.send(docs);
		})
	});
	
	//get all event
	//localhost:3000/api/event
	router.get('/event', function(req, res){

		Event.find({status: 'Approved by Admin'}, function(err, docs){

        	res.send(docs);
    	});
	});

	//get specific event
	//localhost:3000/api/event/:event_id
	router.get('/event/:event_id', function(req, res){
		
		Event.findById(req.params.event_id, function(err, docs){
			
        	res.send(docs);
    	});
	});

	//delete specific event
	//localhost:3000/api/event/remove/:event_id
	router.delete('/event/remove/:event_id', function(req, res){
		
		Event.remove({_id: req.params.event_id}, function(err, docs){
		
			if(err){
				res.send({success: false});
			}else{
				res.send({success: true, message: 'Successful delete event'});
			}
        	
    	});
    	
	});

	//update event
	//localhost:3000/api/event/update/:event_id
	router.put('/event/update/:event_id', function(req, res){
	
		var query = {_id: req.params.event_id};
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
		event.status = req.body.status;
		event.lock = true;
		
		Event.update(query, event, function(err, docs){
					
        	res.send(docs);
    	});
	});

	//add new event
	//localhost:3000/api/event/new
	router.post('/event/new', function(req, res){
		
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
		
		event.save(function(err){
			if(err){
					res.json({success: false, message: 'Event name existed'});
					
				}else{
					res.json({success: true, message: 'Event created'});
					
				}
			});
	});

	
	

module.exports = router;
