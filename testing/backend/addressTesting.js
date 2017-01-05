const mocha = require('mocha'),
    assert = require('assert'),
    request = require('request'),
    Address = require('../../server/models/Addresses.js');

describe('Address testing', function() {
    let newAddress;

    it('should add an address', function(done) {
        let body = {
            country: 1,
            city: "Kortrijk",
            postal: 8500,
            street: "Graaf Karel de Goedelaan",
            number: 5
        };

        Address.addOrUpdateAddress(-1, body, function(err, id) {
            if (err) {
                console.log("Error: " + err.errmsg);
            } else {
                assert.ok(id, "Address added");
                newAddress = id;
            }
            done();
        });
    });

    it('should get one address by id', function (done) {
        Address.getAddressById(newAddress, function (err, address) {
            if (err) {
                console.log("Error: " + err.errmsg);
            } else {
                assert.equal(address._id, newAddress);
            }
            done();
        });
    });

    it('should delete an address', function(done) {
        Address.deleteAddress(newAddress, function(err) {
            if (err) {
                console.log("Error: " + err.errmsg);
            } else {
                assert.ok(newAddress, "Address added");
            }
            done();
        });
    });
});