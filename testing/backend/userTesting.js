const mocha = require('mocha'),
	mongoose = require('mongoose'),
    assert = require('assert'),
    request = require('request'),
    User = mongoose.model('User');

let baseUrl = "http://localhost:1337/";

if (process.env.NODE_ENV === 'production') {
    baseUrl = "https://localhost:1337/";
}

describe('Users testing', () => {
    it('should get all users', (done) => {
        User.getUsers((err, users) => {
            let result = users.length >= 1;
            assert.equal(result, true, "One or more users are found");
            done();
        });
    });

    it('should get one user by username', (done) => {
        User.getUserByUsername("admin", (err, user) => {
            assert.equal(user.username, "admin", "User with admin username found");
            done();
        });
    });

    it('should make an API call and return that a wrong password is used for an existing user', (done) => {
        request.post({
            url: baseUrl + 'login',
            form: {
                email: 'admin@subporter.be',
                password: 'wrongpassword'
            }
        }, (err, res, body) => {
            if (err) {
                console.log("Error: " + err.message);
            } else {
                let result = JSON.parse(body).info;
                assert.equal(result, "Error during login, wrong password", "Wrong password");
                done();
            }
        });
    });

    it('should make an API call and check if a user with a certain email exists', (done) => {
        request.get(baseUrl + 'check/email/non.existing@email.com', (err, res, body) => {
            if (err) {
                console.log("Error: " + err.message);
            } else {
                let result = JSON.parse(body).found;
                assert.equal(result, false, "User with non-existing email doesn't exist");
                done();
            }
        });
    });

    it('should make an API call and check if a user with a certain username exists', (done) => {
        request.get(baseUrl + 'check/username/admin', (err, res, body) => {
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