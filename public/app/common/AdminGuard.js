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
var Rx_1 = require("rxjs/Rx");
var router_1 = require("@angular/router");
var Auth_1 = require("../services/Auth");
var AdminGuard = (function () {
    function AdminGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        if (this.auth.isLoggedIn()) {
            return this.auth.isAdmin().map(function (success) {
                if (success) {
                    return true;
                }
                else {
                    _this.router.navigate(['/landing']);
                    return false;
                }
            }).catch(function () {
                _this.router.navigate(['/landing']);
                return Rx_1.Observable.of(false);
            });
        }
        else {
            this.router.navigate(['/login']);
            return Rx_1.Observable.of(false);
        }
    };
    return AdminGuard;
}());
AdminGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Auth_1.Auth, router_1.Router])
], AdminGuard);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=AdminGuard.js.map