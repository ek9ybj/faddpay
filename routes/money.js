const express = require('express');
const router = express.Router();

const config = require('../config.js');

let Money = require('../models/money');
let Currency = require('../models/currency');

router.get('/deposit', function(req, res){
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

     Currency.find({}, function(err, currencies){
        if(err){
            console.log(err);
        } else {
            res.locals.currencies = currencies;
        }
    });
    res.locals.message = req.flash('messages');
    res.render('deposit');
})

router.post('/deposit', function(req, res){
    const amount = req.body.amount;
    const currency = req.body.currency;

    req.checkBody('amount', 'amount is required!').notEmpty();
    req.checkBody('currency', 'chooseing currency is required!').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        console.log(errors);
        req.flash('messages', errors);
        res.redirect('/money/deposit');
    }
    else{
        Money.findOne({userId: req.session.user._id, currencyId: currency}, function(err, money){
            if(money){
                money.balance = +money.balance + +amount;
                money.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        req.flash('messages', { type: 'succes', message: 'Payment successful.'})
                        res.redirect('/');
                    }
                })
            }else{
                let newMoney = new Money({
                    userId:req.session.user._id,
                    balance:amount,
                    currencyId:currency
                })
                newMoney.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        req.flash('messages', { type: 'succes', message: 'Payment successful.'})
                        res.redirect('/');
                    }
                })
            }

        })
        
    }
})

module.exports = router;