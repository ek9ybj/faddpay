// Packages
const express = require('express');
const router = express.Router();

const middleware = require('../middlewares.js');

// Config
const config = require('../config.js');

// Models
let User = require('../models/user');
let Transaction = require('../models/transaction');

// Send Form
router.get('/send', middleware.isAuthenticated(true), function (req, res) {
    res.locals.tab = 'send';
    res.locals.currencies = config.currencies;
    res.locals.messages = req.flash('messages');
    res.render('send');
})

// Send
router.post('/send', middleware.isAuthenticated(true), function (req, res) {
    const amount = Number(req.body.amount);
    const currency = req.body.currency;
    const email = req.body.email;

    req.checkBody('email', "E-mail is required!").notEmpty();
    req.checkBody('email', "E-mail is invalid!").isEmail();
    req.checkBody('amount', "Amount is required!").notEmpty();
    req.checkBody('amount', 'Invalid amount!').isFloat({ gt: 0.0 });
    req.checkBody('currency', 'Invalid currency!').custom(value => {
        return config.currencies.includes(currency);
    });
    let errors = req.validationErrors();

    if (errors) {
        req.flash('messages', errors);
        res.redirect('/payment/send');
    } else {
        if(email != req.session.user.email) {
            if (currency in req.session.user.balances && req.session.user.balances[currency] >= amount) {
                User.findOne({ email: email }, function (err, target) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        if (target) {
                            req.session.user.balances[currency] -= amount;
                            User.findByIdAndUpdate(req.session.user._id, { $set: { balances: req.session.user.balances } }, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return;
                                } else {
                                    if (!(currency in target.balances)) {
                                        target.balances[currency] = amount;
                                    } else {
                                        target.balances[currency] += amount;
                                    }
                                    User.findByIdAndUpdate(target._id, { $set: { balances: target.balances }}, function (err, target) {
                                        if(err) {
                                            console.log(err);
                                            return;
                                        } else {
                                            new Transaction({
                                                sender: {
                                                    id: req.session.user._id,
                                                    email: req.session.user.email
                                                },
                                                recipient: {
                                                    id: target._id,
                                                    email: target.email
                                                },
                                                currency: currency,
                                                amount: amount,
                                                date: Date.now()
                                            }).save();
                                            req.flash('messages', { type: '', message: currency + ' ' + amount.toLocaleString() + ' has been sent to ' + email + '!' });
                                            res.redirect('/payment/send');
                                        }
                                    });
                                }
                            });
                        } else {
                            req.flash('messages', { type: '', message: 'Couldn\'t found any user with the given e-mail!' });
                            res.redirect('/payment/send');
                        }
                    }
                });
            } else {
                req.flash('messages', { type: '', message: 'You don\'t have enough balance for this transaction!' });
                res.redirect('/payment/send');
            }
        } else {
            req.flash('messages', { type: '', message: 'Invalid email!' });
            res.redirect('/payment/send');
        }
    }
});

module.exports = router;