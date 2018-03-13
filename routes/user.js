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
    res.locals.tab = 'register';
    res.locals.messages = req.flash('messages');
    res.render('register');
});

// Registration Request
router.post('/register', function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('email', 'Email is required!').notEmpty();
    req.checkBody('email', 'Email is not valid!').isEmail();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('password2', 'Confirmation is required!').notEmpty();
    req.checkBody('password2', 'Passwords do not match!').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        console.log(errors);
        req.flash('messages', errors);
        res.redirect('/user/register');
    }
    else{
        let newUser = new User({
            name:name,
            email:email,
            password:password,
            created:Date.now()
        });

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        req.flash('messages', { type: 'success', message: 'You are now registered and can log in.'});
                        res.redirect('/user/login');
                    }
                });
            });
        });
    }
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
            bcrypt.compare(password, user.password, function(err, match) {
            //let match = user.password == password; //remove after a working registration that creates the bcrypt hashes
                if(match) {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    req.flash('messages', { type: 'danger', message: 'Invalid e-mail or password!' });
                    res.redirect('/user/login');
                }
            });
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