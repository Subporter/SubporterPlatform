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
var common_1 = require("@angular/common");
var App = (function () {
    function App(location, router) {
        var _this = this;
        this.location = location;
        this.router = router;
        this.hideFooter = false;
        router.events.subscribe(function (url) {
            _this.footer();
        });
    }
    App.prototype.footer = function () {
        var routes = ['/login', '/register', '/404'], route = this.location.path(), inArray = routes.indexOf(route) > -1;
        this.hideFooter = inArray;
    };
    return App;
}());
App = __decorate([
    core_1.Component({
        selector: 'subporter',
        template: "\n        <main>\n            <router-outlet></router-outlet>\n        </main>\n\t\t<subporter-footer [hidden]=\"hideFooter\"></subporter-footer>\n\t"
    }),
    __metadata("design:paramtypes", [common_1.Location, router_1.Router])
], App);
exports.App = App;
;
//# sourceMappingURL=App.js.map