"use strict";
var angular2_jwt_1 = require("angular2-jwt");
var Auth = (function () {
    function Auth() {
    }
    Auth.prototype.isLoggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map