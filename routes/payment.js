// Packages
const express = require('express');
const router = express.Router();

const middleware = require('../middlewares.js');

// Config
const config = require('../config.js');

// Models
let User = require('../models/user');

// Send

router.get('/send', middleware.isAuthenticated(true), function (req, res) {
    res.locals.tab = 'send';
    res.locals.currencies = config.currencies;
    res.locals.messages = req.flash('messages');
    res.render('send');
})

router.post('/send', middleware.isAuthenticated(true), function (req, res) {
    const amount = req.body.amount;
    const currency = req.body.currency;
    const email = req.body.email;
    const name = req.body.name;

    req.checkBody('email', "E-mail is required!").notEmpty();
    req.checkBody('email', "E-mail is invalid!").isEmail();
    req.checkBody('name', "Name is required!").notEmpty();
    req.checkBody('amount', "Amount is required!").notEmpty();
    req.checkBody('currency', 'Invalid currency!').custom(value => {
        return config.currencies.includes(currency);
    });
    var receiverid;
    let errors = req.validationErrors();
    User.findOne({ email: email }, function (err, result) {
        if (err) {
            console.log(err);
            return;
        } else {
            //Sending out
            if ((result.name != name) && errors) {
                req.flash('messages', errors);
                res.redirect('/payment/send');
            } else {
                console.log(result.id);
                receiverid = result.id;
                if (!(currency in result.balances)) {
                    result.balances[currency] = Number(amount);
                } else {
                    result.balances[currency] += Number(amount);
                }
                const history2 = new Date().toISOString().split('.')[0].replace("T", " ") + ": " + currency + " receive";
                result.histories[history2] = Number(amount);
                User.findByIdAndUpdate(receiverid, { '$set': { balances: result.balances, histories: result.histories } }, { new: true }, function (err, user) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });

            }

        }
    });
    //Sender
    if (!(currency in req.session.user.balances)) {
        req.session.user.balances[currency] = (Number(amount) * (-1));
    } else {
        req.session.user.balances[currency] -= Number(amount);
    }
    const history = new Date().toISOString().split('.')[0].replace("T", " ") + ": " + currency + " send";
    req.session.user.histories[history] = Number(amount);
    User.findByIdAndUpdate(req.session.user._id, { '$set': { balances: req.session.user.balances, histories: req.session.user.histories } }, { new: true }, function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
    });
    req.flash('messages', { type: 'success', message: currency + ' ' + amount + ' has been sent to ' + name + '!' });
    res.redirect('/user');
});

module.exports = router;