// https://codeforgeek.com/2016/04/continuous-integration-deployment-jenkins-node-js/

const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:4000');

describe('SAMPLE unit test', function () {
    it('should return home page', function (done) {
        server.get('/').expect('Content-type', /text/).expect(200).end(function (err, res) {
            res.status.should.equal(200);
            done();
        });
    });
});

