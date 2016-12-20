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
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var angular2_jwt_1 = require("angular2-jwt");
var Auth_1 = require("./services/Auth");
var AuthGuard_1 = require("./common/AuthGuard");
var AdminGuard_1 = require("./common/AdminGuard");
var ApiService_1 = require("./services/ApiService");
var App_1 = require("./components/App");
var Home_1 = require("./components/home/Home");
var Register_1 = require("./components/auth/register/Register");
var Login_1 = require("./components/auth/login/Login");
var Landing_1 = require("./components/index/Landing");
var Routes_1 = require("./modules/Routes");
var ng2_fullpage_1 = require("ng2-fullpage/ng2-fullpage");
var Subporter = (function () {
    function Subporter() {
    }
    return Subporter;
}());
Subporter = __decorate([
    core_1.NgModule({
        bootstrap: [App_1.App],
        declarations: [App_1.App, Home_1.Home, Register_1.Register, Login_1.Login, Landing_1.Landing, ng2_fullpage_1.MnFullpageDirective],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            Routes_1.Routing
        ],
        providers: [
            Auth_1.Auth,
            AuthGuard_1.AuthGuard,
            AdminGuard_1.AdminGuard,
            angular2_jwt_1.AUTH_PROVIDERS,
            ApiService_1.ApiService,
            ng2_fullpage_1.MnFullpageService
        ]
    }),
    __metadata("design:paramtypes", [])
], Subporter);
exports.Subporter = Subporter;
//# sourceMappingURL=app.js.map