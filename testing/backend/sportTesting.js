const assert = require('assert'),
    sinon = require('sinon'),
    http = require('http'),
    request = require('request'),
    sports = require('../../server/api/sports.js'),
    loadUser = require('../../server/middleware/loadUser.js'),
    Sport = require('../../server/models/Sports.js');

let app;

if (!app) {
    app = require('../../server/bin/www');
}

beforeEach(function () {

});

describe('Sports testing', function () {
    it('should get all sports', function (done) {
        Sport.getSports(function(err, sports) {
            assert.isAtLeast(sports.length, 1, 'One or more sports are found');
            done();
        })
    });
});