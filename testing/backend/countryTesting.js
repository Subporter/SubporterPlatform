const mocha = require('mocha'),
    mongoose = require('mongoose'),
    assert = require('assert'),
    request = require('request'),
    Country = mongoose.model('Country');

let baseUrl = "http://localhost:1337/";

if (process.env.NODE_ENV === 'production') {
    baseUrl = "https://localhost:1337/";
}

describe('Countries testing', () => {
    it('should get all countries', (done) => {
        Country.getCountries((err, countries) => {
            let result = countries.length >= 1;
            assert.equal(result, true, "One or more countries are found");
            done();
        });
    });

    it('should get one country by id', (done) => {
        Country.getCountryById(1, (err, country) => {
            assert.equal(country._id, 1);
            done();
        });
    });

    it('should make an API call and get all countries', (done) => {
        request.get(baseUrl + 'api/countries', (err, res, body) => {
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
});