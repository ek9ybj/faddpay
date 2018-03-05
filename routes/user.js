// Packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Get Configs
const config = require('../config.js');

// Models
let User = require('../models/user');

// Registration Form
router.get('/register', function(req, res) {
    res.send('todo');
});

// Registration Request
router.post('/register', function(req, res) {
    res.send('todo');
});

// Login Form
router.get('/login', function(req, res) {
    res.send('todo');
});

// Login Request
router.post('/login', function(req, res) {
    res.send('todo');
});

// Logout
router.get('/logout', function(req, res) {
    res.send('todo');
});

module.exports = router;