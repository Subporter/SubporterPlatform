const assert = require('assert'),
    sinon = require('sinon'),
    http = require('http'),
    request = require('request'),
    users = require('../../server/api/users.js'),
    authenticate = require('../../server/routes/authenticate.js'),
    loadUser = require('../../server/middleware/loadUser.js'),
    User = require('../../server/models/Users.js');

let app;

if (!app) {
    app = require('../../server/bin/www');
}

before(function () {

});

describe('Users testing', function () {
    /*it('should run a callback being async', function (done) {
        let spy = sinon.spy();
        User.getUserById(1, spy());
        sinon.assert.calledOnce(spy);
        assert.equal(spy.called, true);
        done();
    });*/
});

after(function () {
    app = null;
});