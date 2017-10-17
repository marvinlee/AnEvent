var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserEventSchema = new Schema({
	username: { type: String, },
	user_id: { type: String, },
	event_id: { type: String, }
	
}, {collection: 'userevent'});

UserEventSchema.pre('save', function(next){
	var userevent = this;
	//user.usertype = 'User';
	
	next();
	
}, {collection: 'userevent'});

module.exports = mongoose.model('UserEvent', UserEventSchema);

/*
	UserType 
	-User
	-Admin
*/