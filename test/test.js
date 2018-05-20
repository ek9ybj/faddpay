// https://codeforgeek.com/2016/04/continuous-integration-deployment-jenkins-node-js/
const supertest = require('supertest');
const should = require('should');
const mongoose = require('mongoose');
const config = require('../config');
const User = require('../models/user');

// Connect to server
const server = supertest.agent('http://localhost:4000');

// Unit Tests
describe('Guest home page test', function () {
    it('should return home page', function (done) {
        server.get('/').end(function (err, res) {
            res.text.should.containEql('<title>FADD Pay</title>');
            res.status.should.equal(200);
            done();
        });
    });
});

describe('Registration test', function () {
    
});

describe('Registration test', function () {
    it('shouldn\'t add testuser2 with wrong email', function (done) {
        server.post('/user/register').type('form').send({name: 'testuser2', email: 'testuser2notanemail', password: 'testing', password2: 'testing'}).redirects(1).end(function (err, res) {
            res.text.should.containEql('Email is not valid!');
            res.status.should.equal(200);
            done();
        });
    });
});

describe('Registration test', function () {
    it('should register testuser2', function (done) {
        server.post('/user/register').type('form').send({name: 'testuser2', email: 'testuser2@asd.com', password: 'testing', password2: 'testing'}).redirects(1).end(function (err, res) {
            res.text.should.containEql('Successful registration!');
            res.status.should.equal(200);
            done();
        });
    });
});

describe('Login and logout test', function () {
    it('should login testuser2', function (done) {
        server.post('/user/login').type('form').send({email: 'testuser2@asd.com', password: 'testing'}).redirects(2).end(function (err, res) {
            res.text.should.containEql('Welcome back');
            res.status.should.equal(200);
            done();
        });
    });
    it('should logout testuser2', function (done) {
        server.get('/user/logout').redirects(2).end(function (err, res) {
            res.text.should.containEql('You\'ve logged out!');
            res.status.should.equal(200);
            done();
        });
    });
});

describe('deposit and send test', function () {
    it('should register testuser3', function (done) {
        server.post('/user/register').type('form').send({name: 'testuser3', email: 'testuser3@asd.com', password: 'testing', password2: 'testing'}).redirects(1).end(function (err, res) {
            res.text.should.containEql('Successful registration!');
            res.status.should.equal(200);
            done();
        });
    });
    it('should login testuser2', function (done) {
        server.post('/user/login').type('form').send({email: 'testuser2@asd.com', password: 'testing'}).redirects(2).end(function (err, res) {
            res.text.should.containEql('Welcome back');
            res.status.should.equal(200);
            done();
        });
    });
    it('should deposit to testuser2', function (done) {
        server.post('/account/deposit').type('form').send({amount: '100', currency: 'HUF'}).redirects(1).end(function (err, res) {
            res.text.should.containEql('has been deposited');
            res.status.should.equal(200);
            done();
        });
    });
    it('should send money to testuser3', function (done) {
        server.post('/payment/send').type('form').send({email: 'testuser3@asd.com', currency: 'HUF', amount: '10'}).redirects(1).end(function (err, res) {
            res.text.should.containEql('has been sent');
            res.status.should.equal(200);
            done();
        });
    });
    it('should display history to testuser2', function (done) {
        server.get('/account/history').end(function (err, res) {
            res.text.should.containEql('10');
            res.status.should.equal(200);
            done();
        });
    });
    it('should display balance to testuser2', function (done) {
        server.get('/').redirects(1).end(function (err, res) {
            res.text.should.containEql('90');
            res.status.should.equal(200);
            done();
        });
    });
    it('should logout testuser2', function (done) {
        server.get('/user/logout').redirects(2).end(function (err, res) {
            res.text.should.containEql('You\'ve logged out!');
            res.status.should.equal(200);
            done();
        });
    });
});

describe('Request test', function () {
    
    it('should register testuser1', function (done) {
        server.post('/user/register').type('form').send({name: 'testuser1', email: 'testuser1@asd.com', password: 'testing', password2: 'testing'}).redirects(1).end(function (err, res) {
            res.text.should.containEql('Successful registration!');
            res.status.should.equal(200);
            done();
        });
    });
    it('should login testuser2', function (done) {
        server.post('/user/login').type('form').send({email: 'testuser2@asd.com', password: 'testing'}).redirects(2).end(function (err, res) {
            res.text.should.containEql('Welcome back');
            res.status.should.equal(200);
            done();
        });
    });
    it('should request from testuser1', function (done) {
        server.post('/payment/request').type('form').send({email: 'testuser1@asd.com', currency: 'HUF', amount: '10'}).redirects(1).end(function (err, res) {
            res.text.should.containEql('has been requested');
            res.status.should.equal(200);
            done();
        });
    });
    it('should logout testuser2', function (done) {
        server.get('/user/logout').redirects(2).end(function (err, res) {
            res.text.should.containEql('You\'ve logged out!');
            res.status.should.equal(200);
            done();
        });
    });
});




//add more tests here

describe('Remove test users', function () {
    removeTestUsers();
})

// Remove test users after all tests are done
async function removeTestUsers() {
    mongoose.connect(config.database.mongodb);
    let db = mongoose.connection;
    await User.findOneAndRemove({ name: 'testuser1' });
    await User.findOneAndRemove({ name: 'testuser2' });
    await User.findOneAndRemove({ name: 'testuser3' });
    db.close();
    console.log('Test users have been removed.');
}