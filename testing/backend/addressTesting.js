const mocha = require('mocha'),
    mongoose = require('mongoose'),
    assert = require('assert'),
    request = require('request'),
    Address = mongoose.model('Address');

describe('Address testing', () => {
    let newAddress;

    it('should add an address', (done) => {
        let body = {
            country: 1,
            city: "Kortrijk",
            postal: 8500,
            street: "Graaf Karel de Goedelaan",
            number: 5
        };

        Address.addOrUpdateAddress(-1, body, (err, id) => {
            if (err) {
                console.log("Error: " + err.errmsg);
            } else {
                assert.ok(id, "Address added");
                newAddress = id;
            }
            done();
        });
    });

    it('should get one address by id', (done) => {
        Address.getAddressById(newAddress, (err, address) => {
            if (err) {
                console.log("Error: " + err.errmsg);
            } else {
                assert.equal(address._id, newAddress);
            }
            done();
        });
    });

    it('should delete an address', (done) => {
        Address.deleteAddress(newAddress, (err) => {
            if (err) {
                console.log("Error: " + err.errmsg);
            } else {
                assert.ok(newAddress, "Address added");
            }
            done();
        });
    });
});