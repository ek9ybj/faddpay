const mongoose = require('mongoose');

const MoneySchema = mongoose.Schema({
     userId: {
         type: String,
         required: true
     },
     balance: {
         type: Number,
         require: true
     },
     currencyId: {
         type: String,
         require: true
     }
})

const Money = module.exports = mongoose.model('Money', MoneySchema);