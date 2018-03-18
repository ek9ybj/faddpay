const express = require('express');
const router = express.Router();

const config = require('../config.js');

let Money = require('../models/money');

router.get('/deposit', function(req, res){
    res.locals.tab = 'deposit';
    res.locals.message = req.flash('messages');
    res.render('deposit');
})

router.post('/deposit', function(req, res){
    const amount = req.body.amount;

    req.checkBody('amount', 'amount is required!').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        console.log(errors);
        req.flash('messages', errors);
        res.redirect('/money/deposit');
    }
    else{
        Money.findOne({userId: req.session.user._id}, function(err, money){
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
                    balance:amount
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