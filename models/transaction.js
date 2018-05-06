// Packages
const mongoose = require('mongoose');

// Transaction Schema
const TransactionSchema = mongoose.Schema({
    sender: {
        type: Object, //email, id
        required: true
    },
    recipient: { //email, id
        type: Object,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { minimize: false });

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);