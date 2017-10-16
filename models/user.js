var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	username: { type: String, lowercase: true, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true, lowercase: true },
	usertype: {type: String}
}, {collection: 'user'});

UserSchema.pre('save', function(next){
	var user = this;
	//user.usertype = 'User';
	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err) return next(err);
		user.password = hash;
		next();
	});
}, {collection: 'user'});

UserSchema.methods.checkPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);

/*
	UserType 
	-User
	-Admin
*/