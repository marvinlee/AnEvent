var express = require('express');
var router = express.Router();

var config = require('../db/config');
var Event = require('../models/event');
var User = require('../models/user');

	//localhost:3000/api/getAllUser
	router.get('/getAllUser', function(req, res){
		
		User.find({}, function(err, docs){

        	res.send(docs);
		})
	});
	
	//localhost:3000/api/event
	router.get('/event', function(req, res){
		//res.send("api works");
		Event.find({status: 'Approved by Admin'}, function(err, docs){

			console.log('got Event');
			console.log(docs.data);


        	res.send(docs);
    	});
	});

	//localhost:3000/api/event/:event_id
	router.get('/event/:event_id', function(req, res){
		
		Event.findById(req.params.event_id, function(err, docs){
			
        	res.send(docs);
    	});
	});

	router.delete('/event/remove/:event_id', function(req, res){
		
		Event.remove({_id: req.params.event_id}, function(err, docs){
		
			if(err){
				res.send({success: false});
			}else{
				res.send({success: true, message: 'Successful delete event'});
			}
        	
    	});
    	
	});

	//localhost:3000/api/event
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

	router.put('/event/update/setlock/:event_id', function(req, res){
		var query = {_id: req.params.event_id};
		
		Event.update(query, {lock: 'true', lock_user: ''}, function(err, docs){

		    res.send(docs);
		});

	})

	router.put('/event/update/getlock/:event_id', function(req, res){
		
		var query = {_id: req.params.event_id};
		var event = new Event();
		
		Event.findOne(query).select('_id lock').exec(function(err, event){
		
			if(event.lock){
				Event.update(query, {lock: 'false'}, function(err, docs){
				
					if(err){
						res.json({success: false, message: 'failed to get lock'});
					}else{
						if(docs.nModified != 0){
							res.json({success: true, lock: false, message: 'success acquired lock'});
						}
						
					}
		        	
		    	});
			}else{
				res.json({success: false, message: 'lock had been acquired by other user'});
			}

        	
    	});

		
	});

	//localhost:3000/api/event
	router.put('/event/update/:event_id', function(req, res){
		//res.send("api works");
		console.log('testing update event' + req.body.name);
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
			console.log('got Event');
			console.log(docs.data);
			
        	res.send(docs);
    	});
	});

	router.put('/event/update/setlock/:event_id', function(req, res){
		var query = {_id: req.params.event_id};
		Event.update(query, {lock: 'true', lock_user: ''}, function(err, docs){

		    res.send(docs);
		});

	})

	router.put('/event/update/getlock/:event_id', function(req, res){
		//res.send("api works");
		console.log('user id = ' + JSON.stringify(req.params));
		var query = {_id: req.params.event_id};
		var event = new Event();
		
		
		console.log('get lock for Event');
		Event.findOne(query).select('_id lock').exec(function(err, event){
			console.log('finding Event');
			console.log('printing = ' + JSON.stringify(event));
			if(event.lock){
				Event.update(query, {lock: 'false'}, function(err, docs){
					console.log('got Event');
					console.log(docs.data);
					if(err){
						res.json({success: false, message: 'failed to get lock'});
					}else{
						if(docs.nModified != 0){
							res.json({success: true, lock: false, message: 'success acquired lock'});
						}
						
					}
		        	
		    	});
			}else{
				res.json({success: false, message: 'lock had been acquired by other user'});
			}

        	//res.send(docs);
    	});

		
	});
	
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

router.post('/removeAllEvent', function(req, res){
		Event.remove().exec();
		Event.find({}, function(err, docs){

		

			console.log('got User');
			console.log(docs.data);


        	res.send(docs);
		});
	});
	

module.exports = router;
