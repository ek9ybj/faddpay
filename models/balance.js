const mongoose = require('mongoose');

const BalanceSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    }
})

const Balance = module.exports = mongoose.model('Balance', BalanceSchema);