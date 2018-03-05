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
    console.log('[MongoDB] Connection established');
});
db.on('error', function(err) {
    console.log('[MongoDB] ' + err);
});

// Models
let User = require('./models/user');

// Load View Engine
var engine = require('express-dot-engine');
app.engine('html', engine.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Session
app.use(session({
    secret: 'The quick brown fox',
    resave: true,
    saveUninitialized: true
}));

// Flash Messages
app.use(flash());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Home Route
app.get('/', function(req, res) {
    res.render('home');
});

// Start Server
app.listen(3000, function() {
    console.log('[Express] Listening on localhost:3000');
});