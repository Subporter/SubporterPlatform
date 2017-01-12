const mocha = require('mocha'),
	mongoose = require('mongoose'),
    assert = require('assert'),
    request = require('request'),
    Sport = mongoose.model('Sport');

let baseUrl = "http://localhost:1337/";

if (process.env.NODE_ENV === 'production') {
    baseUrl = "https://localhost:1337/";
}

describe('Sports testing', () => {
    it('should get all sports', (done) => {
        Sport.getSports((err, sports) => {
            if (err) {
                console.log("Error: " + err.errmsg);
            } else {
                let result = sports.length >= 1;
                assert.equal(result, true, "One or more sports are found");
            }
            done();
        });
    });

    it('should get one sport by id', (done) => {
        Sport.getSportById(1, (err, sport) => {
            if (err) {
                console.log("Error: " + err.errmsg);
            } else {
                assert.equal(sport._id, 1);
            }
            done();
        });
    });

    it('should make an API call and get all sports', (done) => {
        request.get(baseUrl + 'api/sports', (err, res, body) => {
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
});