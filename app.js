// Packages
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// Get Configs
const config = require('./config.js');

// Connect to DB
mongoose.connect(config.database.mongodb);
let db = mongoose.connection;
db.once('open', function() {
    console.log('Database connection established');
});
db.on('error', function(err) {
    console.log(err);
});

// Load View Engine
var engine = require('express-dot-engine');
app.engine('html', engine.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Home Route
app.get('/', function(req, res) {
    res.render('home');
});

// Start Server
app.listen(3000, function() {
    console.log('Listening on localhost:3000');
});