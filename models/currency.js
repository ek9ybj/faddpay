const mongoose = require('mongoose');

const CurrencySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    }
})

const Currency = module.exports = mongoose.model('Currency', CurrencySchema);