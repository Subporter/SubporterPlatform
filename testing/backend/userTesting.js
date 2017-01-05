const mocha = require('mocha'),
    assert = require('assert'),
    sinon = require('sinon'),
    request = require('request'),
    User = require('../../server/models/Users.js');

describe('Users testing', function() {
    it('should make an API call and return that a wrong password is used for an existing user', function(done) {
        request.post({
            url: 'http://localhost:1337/login',
            form: {
                email: 'admin@subporter.be',
                password: 'wrongpassword'
            }
        }, function(err, res, body) {
            if (err) {
                console.log("Error: " + err.message);
            } else {
                let result = JSON.parse(body).info;
                assert.equal(result, "Error during login, wrong password", "Wrong password");
                done();
            }
        });
    });

    it('should get all users', function(done) {
        User.getUsers(function(err, users) {
            let result = users.length >= 1;
            assert.equal(result, true, "One or more users are found");
            done();
        });
    });

    it('should get one user by username', function(done) {
        User.getUserByUsername("admin", function(err, user) {
            assert.equal(user.username, "admin", "User with admin username found");
            done();
        });
    });

    it('should make an API call and check if a user with a certain email exists', function(done) {
        request.get('http://localhost:1337/check/email/non.existing@email.com', function (err, res, body) {
            if (err) {
                console.log("Error: " + err.message);
            } else {
                let result = JSON.parse(body).found;
                assert.equal(result, false, "User with non-existing email doesn't exist");
                done();
            }
        });
    });

    it('should make an API call and check if a user with a certain username exists', function(done) {
        request.get('http://localhost:1337/check/username/admin', function (err, res, body) {
            if (err) {
                console.log("Error: " + err.message);
            } else {
                let result = JSON.parse(body).found;
                assert.equal(result, true, "User with admin username exists");
                done();
            }
        });
    });
});