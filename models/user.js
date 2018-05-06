// Packages
const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    balances: {
        type: Object,
        required: true
    },
    deposits: [{
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
    }],
    lastActivity: {
        type: Date,
        required: true
    }
}, { minimize: false });

const User = module.exports = mongoose.model('User', UserSchema);