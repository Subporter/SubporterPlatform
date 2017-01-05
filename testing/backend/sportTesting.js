const mocha = require('mocha'),
    assert = require('assert'),
    request = require('request'),
    Sport = require('../../server/models/Sports.js');

describe('Sports testing', function() {
    it('should get all sports', function(done) {
        Sport.getSports(function(err, sports) {
            if (err) {
                console.log("Error: " + err.errmsg);
            } else {
                let result = sports.length >= 1;
                assert.equal(result, true, "One or more sports are found");
            }
            done();
        });
    });

    it('should make an API call and get all sports', function(done) {
        request.get('http://localhost:1337/api/sports', function(err, res, body) {
            if (err) {
                console.log("Error: " + err.message);
            } else {
                let sports = JSON.parse(body).data;
                let result = sports.length >= 1;
                assert.equal(result, true, "One or more sports are found");
                done();
            }
        });
    });

    it('should get one sport by id', function(done) {
        Sport.getSportById(1, function(err, sport) {
            if (err) {
                console.log("Error: " + err.errmsg);
            } else {
                assert.equal(sport._id, 1);
            }
            done();
        });
    });
});