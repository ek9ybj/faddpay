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
        type: Array,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);