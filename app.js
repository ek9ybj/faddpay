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
            type: 'danger',
            param: formParam,
            message: msg,
            value: value
        };
    }
}));

// Set locals
app.all('*', function(req, res, next) {
    res.locals.sitename = config.sitename;
    res.locals.siteurl = config.siteurl;
    if(req.session.user) {
        User.findByIdAndUpdate(req.session.user._id, {$set: {lastActivity: Date.now()}}, {new: true}, function (err, user) {
            if(err) {
                console.log(err);
                req.session.user = null;
                res.locals.user =  null;
            } else {
                req.session.user = user;
                res.locals.user = user;
            }
            next();
        });
    } else {
        res.locals.user = null;
        next();
    }
});

// Home Route
app.get('/', function(req, res) {
    if(req.session.user) {
        res.redirect('/user');
    } else {
        res.render('guest');
    }
});

// Routes
app.use('/user', require('./routes/user'));
app.use('/account', require('./routes/account'));
app.use('/payment', require('./routes/payment'));

// Catch-all Route
app.all('*', function(req, res) {
    res.render('404');
});

// Start Server
app.listen(config.port, function() {
    console.log('[Express] Listening on localhost:' + config.port);
});
