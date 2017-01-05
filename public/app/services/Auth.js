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
var angular2_jwt_1 = require("angular2-jwt");
var core_1 = require("@angular/core");
var ApiService_1 = require("./ApiService");
var Auth = (function () {
    function Auth(apiService) {
        this.apiService = apiService;
    }
    Auth.prototype.isLoggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    Auth.prototype.isAdmin = function () {
        return this.apiService.get("check/admin").map(function (response) { return JSON.parse(response.text()).success; });
    };
    return Auth;
}());
Auth = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ApiService_1.ApiService])
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map