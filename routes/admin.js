const express = require('express');
const router = express.Router();

const config = require('../config.js');
const middleware = require('../middlewares.js');

let User = require('../models/user');

router.get('/', middleware.isAdmin(1), function (req, res) {
    res.locals.tab = 'admin';
    res.locals.messages = req.flash('messages');
    User.find({}, function(err, users){
        if(err){
            conssole.log(err);
            return;
        }else{
            res.locals.userList = users;
            res.render('admin');
        }
    });
})

router.post('/', middleware.isAdmin(1), function(req, res){
    req.checkBody('id', 'Id is required!').notEmpty();
    req.checkBody('freezed', 'User state is required!').notEmpty();
    
    let newState=req.body.freezed=="true";
    console.log(newState);
    newState=!newState;
    console.log(newState);

    let errors = req.validationErrors();
    if(errors){
        req.flash('messages', errors);
        res.redirect('/admin');
        console.log(errors);
    }else{
        User.findByIdAndUpdate(req.body.id,{$set: {freezed: newState}}, function (err, user){
            if(err){
                console.log(err);
                return;
            }else{
                res.redirect('/admin');
            }
        })
    }
})

router.post('/user', middleware.isAdmin(1), function(req, res){
    res.locals.tab = '';
    req.checkBody('id', 'Id is required!').notEmpty();

    let errors = req.validationErrors();
    if(errors){
        req.flash('messages', errors);
        res.redirect('/admin');
    }else{
        User.findById(req.body.id, function(err, user){
            res.locals.userList = user;
            console.log(user);
            res.render('userDetails');
        })
    }
})

module.exports = router;