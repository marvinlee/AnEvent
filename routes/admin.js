//admin api function
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = 'testing';

var Event = require('../models/event');
var User = require('../models/user');

	//get waiting list event for approve
	//localhost:3000/admin/event/approve
	router.get('/event/approve', function(req, res){

		Event.find({status: 'Waiting for approval by Admin'}, function(err, docs){

			Event.find({status: 'Waiting for approval by Admin'}, function(err, docs){

				if(docs.name =='undefined'){
					docs.success = false;
				}else{
					docs.success = true;
				}
				
	        	res.send(docs);
	    	});
		});
	});

	//get specific event
	//localhost:3000/admin/event/:event_id
	router.get('/event/:event_id', function(req, res){

		Event.findById(req.params.event_id, function(err, docs){

			Event.findById(req.params.event_id, function(err, docs){

	        	res.send(docs);
	    	});
		});
	});

	//make user admin function
	//localhost:3000/admin/makeUserAdmin/user_id
	router.put('/makeUserAdmin/:user_id', function(req, res){
		var query = {_id: req.params.user_id};
		
		User.update(query, { usertype: 'Admin' },  function(err, doc){
		    
		    if (doc.nModified == 0){
		    	return res.send({success: false});
		    }else{
		    	return res.send({success: true});
		    } 
		    
		});
	});

	//admin approve event
	//localhost:3000/admin/approveEvent/event_id
	router.put('/approveEvent/:event_id', function(req, res){
		var query = {_id: req.params.event_id};
		
		Event.update(query, { status: 'Approved by Admin' },  function(err, doc){
		    
		    if (doc.nModified == 0){
		    	return res.send({success: false, message: 'fail to approve event!'});
		    }else{
		    	return res.send({success: true,  message: 'Event approved!'});
		    }
		    
		    
		});
	});

module.exports = router;

