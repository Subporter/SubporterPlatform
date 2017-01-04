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
var ApiService_1 = require("../../../services/ApiService");
var AdminOverview = (function () {
    function AdminOverview(router, http, authHttp, apiService) {
        this.router = router;
        this.http = http;
        this.authHttp = authHttp;
        this.apiService = apiService;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    AdminOverview.prototype.useJwtHelper = function () {
        var token = localStorage.getItem("id_token");
        console.log("Token:", token);
        console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
    };
    AdminOverview.prototype.logout = function () {
        localStorage.removeItem("id_token");
        this.router.navigate(["login"]);
    };
    AdminOverview.prototype.updateUser = function () {
        var name = "Niels";
        var body = JSON.stringify({
            name: name
        });
        /*contentHeaders.append("Authorization", localStorage.getItem("id_token"));
        this.authHttp.put("http://localhost:1337/api/user", body, {
            headers: contentHeaders
        })
            .subscribe(
            response => this.response = response.text(),
            error => this.response = error.text
            );*/
    };
    AdminOverview.prototype.callAnonymousApi = function () {
        this._callApi("Anonymous", "api/sports");
    };
    AdminOverview.prototype.callSecuredApi = function () {
        this._callApi("Secured", "api/user");
    };
    AdminOverview.prototype._callApi = function (type, url) {
        var _this = this;
        this.apiService.get(url).subscribe(function (response) { return _this.response = response.text(); }, function (error) { return _this.response = error.text; });
        /*this.useJwtHelper();
        this.response = null;
        if (type === "Anonymous") {
            this.http.get(url)
                .subscribe(
                response => this.response = response.text(),
                error => this.response = error.text
                );
        }
        if (type === "Secured") {
            contentHeaders.append("Authorization", localStorage.getItem("id_token"));
            this.http.get(url, {
                headers: contentHeaders
            })
                .subscribe(
                response => this.response = response.text(),
                error => this.response = error.text
                );
        }*/
    };
    return AdminOverview;
}());
AdminOverview = __decorate([
    core_1.Component({
        selector: 'admin-overview',
        template: "\n\t\t<div>\n\t\t\t<div class=\"home jumbotron centered\">\n\t\t\t\t<h1>Welcome to Angular2 through Auth</h1>\n\t\t\t\t<h2 *ngIf=\"jwt\">Your JWT is:</h2>\n\t\t\t\t<pre *ngIf=\"jwt\" class=\"jwt\"><code>{{ jwt }}</code></pre>\n\t\t\t\t<p>Click any of the buttons to call an API and get a response</p>\n\t\t\t\t<p><a class=\"btn btn-primary btn-lg\" role=\"button\" (click)=\"callAnonymousApi()\">Call Anonymous API</a></p>\n    \t\t\t<p><a class=\"btn btn-primary btn-lg\" role=\"button\" (click)=\"callSecuredApi()\">Call Secure API</a></p>\n    \t\t\t<p><a class=\"btn btn-primary btn-lg\" role=\"button\" (click)=\"logout()\">Logout</a></p>\n    \t\t\t<p><a class=\"btn btn-primary btn-lg\" role=\"button\" (click)=\"updateUser()\">Update user</a></p>\n    \t\t\t<h2 *ngIf=\"response\">The response of calling the <span class=\"red\">{{ api }}</span> API is:</h2>\n    \t\t\t<h3 *ngIf=\"response\">{{ response }}</h3>\n\t\t\t</div>\n\t\t</div>\n\t"
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, ApiService_1.ApiService])
], AdminOverview);
exports.AdminOverview = AdminOverview;
//# sourceMappingURL=Overview.js.map