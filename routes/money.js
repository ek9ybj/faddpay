const express = require('express');
const router = express.Router();

const config = require('../config.js');

let Money = require('../models/money');
let Balance = require('../models/balance');

router.get('/deposit', function (req, res) {
    res.locals.tab = 'deposit';

    /*
    new Currency({  //uncomment for some currency, dont forget to comment back once it run
        name:"HUF",
        value:1
    }).save(function(err){
        if(err){
            console.log(err);
            return;
        }
            
    });
    new Currency({
        name:"USD",
        value:250
    }).save(function(err){
        if(err){
            console.log(err);
            return;
        }
            
    });
    */

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

router.post('/deposit', function (req, res) {
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
        res.redirect('/money/deposit');
    } else {
        //redo

        //Money.findOne({ userId: req.session.user._id, currencyId: currency }, function (err, money) {
        //    if (money) {
        //        money.balance = +money.balance + +amount;
        //        money.save(function (err) {
        //            if (err) {
        //                console.log(err);
        //                return;
        //            } else {
        //                req.flash('messages', { type: 'succes', message: 'Payment successful.' })
        //                res.redirect('/');
        //            }
        //        })
        //    } else {
        //        let newMoney = new Money({
        //            userId: req.session.user._id,
        //            balance: amount,
        //            currencyId: currency
        //        })
        //        newMoney.save(function (err) {
        //            if (err) {
        //                console.log(err);
        //                return;
        //            } else {
        //                req.flash('messages', { type: 'succes', message: 'Payment successful.' })
        //                res.redirect('/');
        //            }
        //        })
        //    }
        //
        //})

    }
})

module.exports = router;