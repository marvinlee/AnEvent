var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
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
				},
	status: String,
	user_id: String,
	lock: Boolean


}, {collection: 'eventlist'});

EventSchema.pre('save', function(next){
	var event = this;
	
	
	next();
}, {collection: 'eventlist'});

module.exports = mongoose.model('Event', EventSchema);
