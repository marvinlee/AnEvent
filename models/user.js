var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	username: { type: String, lowercase: true, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true, lowercase: true }
});

UserSchema.pre('save', function(next){
	var user = this;
	/*bcrypt.hash(user.password, null, null, function(err){
		if(err) return next(err);
		user.password = hash;
		next();
	});*/
});


/*var EventSchema = new Schema({
	id: String,
	name: String,
	date: String,
	location: String,
	type: String,
	desc: String,
	organizer: { 	organizationname: String,
					personname: String,
					email: String,
					contact: String,
					mobilecontact: String
				}

});*/
var User = mongoose.model('User', UserSchema);
module.exports = User;