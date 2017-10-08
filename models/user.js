var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	username: { type: String, lowercase: true, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true, lowercase: true }
}, {collection: 'user'});

/*UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, null, null, function(err){
		if(err) return next(err);
		user.password = hash;
		next();
	});
}, {collection: 'user'});*/

module.exports = mongoose.model('User', UserSchema);