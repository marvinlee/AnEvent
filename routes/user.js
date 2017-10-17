var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = 'testing';

var Event = require('../models/event');
var User = require('../models/user');
var UserEvent = require('../models/userevent');


	//localhost:3000/user/register
	router.post('/register', function(req, res){
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		user.usertype = req.body.usertype;
		if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
			res.json({success: false, message: 'Ensure username, password and email were provided'});
			
		} else {
			user.save(function(err){
				if(err){
					res.json({success: false, message: 'Username or email existed!'});
					
				}else{
					res.json({success: true, message: 'User created'});
					
				}
			});
		}
	});

	//localhost:3000/user/login
	router.post('/login', function(req, res){

		User.findOne({username : req.body.username }).select('_id email username password usertype').exec(function(err, user){
			
			if(err){
				throw err;
			}

			if(!user){
				res.json({success: false, message: 'Could not find user!'});
			}else if(user){

				if(req.body.password){
					var validPassword = user.checkPassword(req.body.password);
				}else{
					res.json({success : false, message : 'No password found!'});
				}

				if(!validPassword){
					res.json({success : false, message : 'Wrong password found!'});
				}else{
					var token = jwt.sign({ user_id: user._id, username: user.username, email: user.email, usertype: user.usertype}, secret, {expiresIn: '24h'});
					res.json({success : true, message : 'Welcome!', token : token, usertype: user.usertype});
				}

			}

		});

	});

	router.post('/joinevent', function(req, res){
		var userevent = new UserEvent();
		userevent.username = req.body.username;
		userevent.user_id = req.body.user_id;
		userevent.event_id = req.body.event_id;
		
		if(userevent.username == null || userevent.username == '' || userevent.user_id == null || userevent.user_id == '' || userevent.event_id == null || userevent.event_id == ''){
			res.json({success: false, message: 'Failed to join event'});
			
		} else {
			userevent.save(function(err){
				if(err){
					res.json({success: false, message: 'Event had been joined'});
					
				}else{
					res.json({success: true, message: 'Successfully joined event'});
					
				}
			});
		}
	});


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


	router.put('/updateUserProfile/:user_id', function(req, res){

		var query = {_id: req.params.user_id};
		var user = new User();

		User.update(query, user,  function(err, doc){
		    if (doc.nModified == 0){
		    	return res.send({success: false});
		    }else{
		    	return res.send({success: true});
		    }
		    
		});
	});


	router.use(function(req, res, next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if(token){
			jwt.verify(token, secret, function(err, decoded){
				if(err){
					res.json({success : false, message : 'Token invalid'});
				}else{
					req.decoded = decoded;
					req.decoded.success = true;	
					next();
				}
			});
		}else{
			res.json({success: false, message : 'No token provided'});
		}
	});

	//localhost:3000/user/currentUser
	router.post('/currentUser', function(req, res){
		res.send(req.decoded);
	});


module.exports = router;
