const express = require('express');
const router = express.Router();

const config = require('../config.js');
const middleware = require('../middlewares.js');

let User = require('../models/user');

router.get('/deposit', middleware.isAuthenticated(true), function (req, res) {
    res.locals.tab = 'deposit';

    //Currency.find({}, function (err, currencies) {
    //    if (err) {
    //        console.log(err);
    //    } else {
    //        res.locals.currencies = currencies;
    //    }
    //});
    res.locals.currencies = config.currencies;
    res.locals.messages = req.flash('messages');
    res.render('deposit');
})

router.post('/deposit', middleware.isAuthenticated(true), function (req, res) {
    const amount = req.body.amount;
    const currency = req.body.currency;

    req.checkBody('amount', 'Amount is required!').notEmpty();
    req.checkBody('amount', 'Invalid amount!').isFloat({ gt: 0.0 });
    req.checkBody('currency', 'Currency is required!').notEmpty();
    req.checkBody('currency', 'Invalid currency!').custom(value => {
        return config.currencies.includes(currency);
    });

    let errors = req.validationErrors();

    if (errors) {
        req.flash('messages', errors);
        res.redirect('/account/deposit');
    } else {
        if (!(currency in req.session.user.balances)) {
            req.session.user.balances[currency] = Number(amount);
        } else {
            req.session.user.balances[currency] += Number(amount);
        }
        const history = new Date().toISOString().split('.')[0].replace("T"," ")+": " + currency + " deposit";
       
        if (!(history in req.session.user.histories)) {
            req.session.user.histories[history] = Number(amount);
        } else {
            req.session.user.histories[history] += Number(amount);
        }
        req.session.user.histories[history] = Number(amount);
       
        User.findByIdAndUpdate(req.session.user._id, { '$set': { balances: req.session.user.balances, histories: req.session.user.histories } }, {new: true}, function(err, user) {
            if (err) {
                console.log(err);
                return;
            }
            req.session.user = user;
            console.log(req.session.user);
            req.flash('messages', { type: 'success', message: currency + ' ' + amount + ' has been deposited in your account!' });
            res.redirect('/user');
        });
      
    }
})

router.get('/history', middleware.isAuthenticated(true), function (req, res){
    res.locals.tab = 'history';
    res.locals.messages = req.flash('messages');
    res.render('history');
})

module.exports = router;