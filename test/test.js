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
    it('should register testuser1', function (done) {
        server.post('/user/register').type('form').send({name: 'testuser1', email: 'testuser1@asd.com', password: 'testing', password2: 'testing'}).redirects(1).end(function (err, res) {
            res.text.should.containEql('Successful registration!');
            res.status.should.equal(200);
            done();
        });
    });
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
    removeTestUsers(); //call this in the very last test only
});

//add more tests here, then move the removeTestUsers() call to the very last

// Remove test users after all tests are done
async function removeTestUsers() {
    mongoose.connect(config.database.mongodb);
    let db = mongoose.connection;
    await User.findOneAndRemove({ name: 'testuser1' });
    await User.findOneAndRemove({ name: 'testuser2' });
    db.close();
    console.log('Test users have been removed.');
}