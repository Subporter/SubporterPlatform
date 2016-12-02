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
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var angular2_jwt_1 = require("angular2-jwt");
var AuthService_1 = require("./services/AuthService");
var Home_1 = require("./components/Home");
var Register_1 = require("./components/Register");
var Login_1 = require("./components/Login");
var App_1 = require("./components/App");
var Subporter = (function () {
    function Subporter() {
    }
    return Subporter;
}());
Subporter = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, router_1.RouterModule.forRoot(Routes, { useHash: true })],
        declarations: [Home_1.Home, Register_1.Register, Login_1.Login, App_1.App],
        bootstrap: [App_1.App],
        providers: [AuthService_1.AuthGuard].concat(angular2_jwt_1.AUTH_PROVIDERS)
    }),
    __metadata("design:paramtypes", [])
], Subporter);
exports.Subporter = Subporter;
//# sourceMappingURL=app.js.map