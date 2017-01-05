const mocha = require('mocha'),
    assert = require('assert'),
    request = require('request'),
    Country = require('../../server/models/Countries.js');

describe('Countries testing', function() {
    it('should get all countries', function(done) {
        Country.getCountries(function(err, countries) {
            let result = countries.length >= 1;
            assert.equal(result, true, "One or more countries are found");
            done();
        });
    });

    it('should make an API call and get all countries', function(done) {
        request.get('http://localhost:1337/api/countries', function (err, res, body) {
            if (err) {
                console.log("Error: " + err.message);
            } else {
                let countries = JSON.parse(body).data;
                let result = countries.length >= 1;
                assert.equal(result, true, "One or more countries are found");
                done();
            }
        });
    });

    it('should get one country by id', function(done) {
        Country.getCountryById(1, function(err, country) {
            assert.equal(country._id, 1);
            done();
        });
    });
});