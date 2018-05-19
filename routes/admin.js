const express = require('express');
const router = express.Router();

const config = require('../config.js');
const middleware = require('../middlewares.js');

let User = require('../models/user');

router.get('/', middleware.isAdmin(1), function (req, res) {
    res.locals.tab = 'admin';
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

module.exports = router;