const express = require('express');
const router = express.Router();

const config = require('../config.js');
const middleware = require('../middlewares.js');

let User = require('../models/user');
let Transaction = require('../models/transaction');

router.get('/deposit', middleware.isAuthenticated(true), function (req, res) {
    res.locals.tab = 'deposit';
    res.locals.currencies = config.currencies;
    res.locals.messages = req.flash('messages');
    res.render('deposit');
})

router.post('/deposit', middleware.isAuthenticated(true), function (req, res) {
    const amount = Number(req.body.amount);
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
            req.session.user.balances[currency] = amount;
        } else {
            req.session.user.balances[currency] += amount;
        }
       
        User.findByIdAndUpdate(req.session.user._id, { $set: { balances: req.session.user.balances }, $push: { deposits: { currency: currency, amount: amount, date: Date.now() } } }, {new: true}, function(err, user) {
            if (err) {
                console.log(err);
                return;
            }
            req.flash('messages', { type: '', message: currency + ' ' + amount.toLocaleString() + ' has been deposited into your account!' });
            res.redirect('/user');
        });
      
    }
})

router.get('/history', middleware.isAuthenticated(true), function (req, res){
    res.locals.tab = 'history';
    Transaction.find({$or: [{ 'sender.id': req.session.user._id }, { 'recipient.id': req.session.user._id }] }, [], { sort: { date: -1 } }, function (err, transactions) {
        if(err) {
            console.log(err);
            return;
        } else {
            res.locals.transactions = transactions;
            res.locals.messages = req.flash('messages');
            res.render('history');
        }
    });

})

module.exports = router;