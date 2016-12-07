"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var Register = (function () {
    function Register(router, http) {
        this.router = router;
        this.http = http;
    }
    Register.prototype.register = function (event, username, password) {
        event.preventDefault();
    };
    Register.prototype.login = function (event) {
        event.preventDefault();
        this.router.navigate(['login']);
    };
    return Register;
}());
Register = __decorate([
    core_1.Component({
        selector: 'register',
        template: ""
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], Register);
exports.Register = Register;
//# sourceMappingURL=Register.js.map