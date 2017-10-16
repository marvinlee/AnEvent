//initialize module
var express = require('express');
var app = express();
var mongoose = require('./db/config');
var bodyParser = require('body-parser');
var router = express.Router();
var User = require('./models/user');
var Event = require('./models/event');
var appRoutes = require('./routes/api');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');

//bodyparser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', appRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

//define views folder
app.use(express.static(__dirname + "/public")); 


//start listening page
app.listen(3000);
console.log("Server running on port 3000");