// Packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Get Configs
const config = require('../config.js');

// Models
let User = require('../models/user');

// Registration Form
router.get('/register', function(req, res) {
    res.send('todo');
});

// Registration Request
router.post('/register', function(req, res) {
    res.send('todo');
});

// Login Form
router.get('/login', function(req, res) {
    //req.flash('messages', { type: 'success', message: 'Test' });
    res.locals.tab = 'login';
    res.locals.messages = req.flash('messages');
    res.render('login');
});

// Login Request
router.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }, function(err, user) {
        if(user) {
            //bcrypt.compare(password, user.password, function(err, match) {
            let match = user.password == password; //remove after a working registration that creates the bcrypt hashes
                if(match) {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    req.flash('messages', { type: 'danger', message: 'Invalid e-mail or password!' });
                    res.redirect('/user/login');
                }
            //});
        } else {
            req.flash('messages', { type: 'danger', message: 'Invalid e-mail or password!' });
            res.redirect('/user/login');
        }
    });
});

// Logout
router.get('/logout', function(req, res) {
    req.session.user = null;
    req.flash('messages', { type: 'success', message: 'You\'ve logged out!' });
    res.redirect('/user/login');
});

//todo: isAuthenticated()

module.exports = router;