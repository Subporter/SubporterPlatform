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
var headers_1 = require("../../../common/headers");
var Login = (function () {
    function Login(router, http) {
        this.router = router;
        this.http = http;
    }
    Login.prototype.login = function () {
        var _this = this;
        event.preventDefault();
        var email = this.email, password = this.password;
        var body = JSON.stringify({
            email: email,
            password: password
        });
        this.http.post('/login', body, {
            headers: headers_1.contentHeaders
        })
            .subscribe(function (response) {
            console.log(response.json());
            if (response.json().success = true) {
                localStorage.setItem("id_token", response.json().token);
                _this.router.navigate(['home']);
            }
        }, function (error) {
            alert(error.text());
            console.error(error.text());
        });
    };
    Login.prototype.register = function (event) {
        event.preventDefault();
        this.router.navigate(['register']);
    };
    return Login;
}());
Login = __decorate([
    core_1.Component({
        selector: 'login',
        template: "\n\t\t<div>\n\t\t\t<h1>Login</h1>\n\t\t\t<form (submit)=\"login($event)\">\n\t\t\t\t<div class=\"form-group\">\n     \t\t\t\t<label for=\"email\">Email</label>\n     \t\t\t\t<input [(ngModel)]=\"email\" type=\"email\" class=\"form-control\" name=\"email\" id=\"email\" placeholder=\"Email\">\n   \t\t\t\t</div>\n   \t\t\t\t<div class=\"form-group\">\n     \t\t\t\t<label for=\"password\">Password</label>\n     \t\t\t\t<input [(ngModel)]=\"password\" type=\"password\" class=\"form-control\" name=\"password\" id=\"password\" placeholder=\"Password\">\n   \t\t\t\t</div>\n   \t\t\t\t<button type=\"submit\" class=\"btn btn-default\">Submit</button>\n     \t\t\t<a [routerLink]=\"['/register']\">Click here to register</a>\n     \t\t\t<a [routerLink]=\"['/home']\">Click here to go home</a>\n\t\t\t</form>\n\t\t</div>\n\t"
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], Login);
exports.Login = Login;
//# sourceMappingURL=Login.js.map