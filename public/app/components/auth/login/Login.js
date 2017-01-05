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
var angular2_jwt_1 = require("angular2-jwt");
var Headers_1 = require("../../../common/Headers");
var Login = (function () {
    function Login(router, http, apiService) {
        this.router = router;
        this.http = http;
        this.apiService = apiService;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    Login.prototype.useJwtHelper = function () {
        var token = localStorage.getItem("id_token");
        console.log("Token:", token);
        console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
    };
    Login.prototype.login = function () {
        var _this = this;
        event.preventDefault();
        var email = this.email, password = this.password;
        var body = JSON.stringify({
            email: email,
            password: password
        });
        this.http.post('/login', body, {
            headers: Headers_1.contentHeaders
        })
            .subscribe(function (response) {
            console.log(response.json());
            if (response.json().success === true) {
                var socket = io.connect();
                socket.emit("login", response.json().id);
                _this.apiService.get('/api/users').subscribe(function (response) {
                    console.log("USER DATA");
                    console.log(response);
                }, function (error) {
                    console.log(error.text());
                });
                socket.on("NewLoanuser", function () {
                    alert("socket.io laat weten dat iemand you loan heeft aanvaard");
                });
                socket.on("loanAdded", function () {
                    alert("socket.io laat weten dat iemnand een wedstrijd voor je favoriete ploeg online heeft geplaatst");
                });
                localStorage.setItem("id_token", response.json().token);
                _this.useJwtHelper();
                _this.router.navigate(['landing']);
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
        template: "\n\t\t<div class=\"login container\">\n\t<div class=\"login-section\">\n\t\t<h1>Login</h1>\n\t\t<form (submit)=\"login($event)\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<div class=\"input-field\">\n\t\t\t\t\t<input [(ngModel)]=\"email\" type=\"email\" class=\"form-control validate\" name=\"email\" id=\"email\">\n\t\t\t\t\t<label for=\"email\">Email</label>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<div class=\"input-field\">\n\n\t\t\t\t\t<input [(ngModel)]=\"password\" type=\"password\" class=\"form-control validate\" name=\"password\" id=\"password\">\n\t\t\t\t\t<label for=\"password\">Password</label>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<button type=\"submit\" class=\"btn btn-default\">Submit</button>\n\t\t\t<a [routerLink]=\"['/']\">Click here to go landing</a>\n\t\t</form>\n\t</div>\n\t<div class=\"register-section\">\n\t\t<h1>Not a member?</h1>\n\t\t<p>If you're not yet registered, please register now to obtain full access.</p>\n\t\t<br/>\n\n\t\t<button class=\"btn\" [routerLink]=\"['/register']\"> Register now </button>\n\n\n\t</div>\n</div>\n\n\n\n\n\n\n\n\t",
        styleUrls: ['../../../css/css/login.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, Object])
], Login);
exports.Login = Login;
//# sourceMappingURL=Login.js.map