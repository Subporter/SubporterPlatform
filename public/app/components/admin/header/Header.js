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
var HeaderAdmin = (function () {
    function HeaderAdmin(router, http) {
        this.router = router;
        this.http = http;
    }
    return HeaderAdmin;
}());
HeaderAdmin = __decorate([
    core_1.Component({
        selector: 'subporter-header-admin',
        template: "\n\t <nav>\n\t \t<div class=\"nav-wrapper\">\n\t \t\t<a [routerLink]=\"['/']\" class=\"brand-logo\">Subporter</a>\n\t \t\t<ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n\t \t\t\t<li>\n\t \t\t\t\t<a [routerLink]=\"['/search']\">Zoeken</a>\n\t \t\t\t</li>\n\t \t\t\t<li>\n\t \t\t\t\t<a [routerLink]=\"['/cart']\">Winkelwagen</a>\n\t \t\t\t</li>\n\n\t \t\t\t<li>\n\t \t\t\t\t<a [routerLink]=\"['/profile']\">Profiel</a>\n\t \t\t\t</li>\n\n\t \t\t\t<li>\n\t \t\t\t\t<a [routerLink]=\"['/admin']\">Admin</a>\n\t \t\t\t</li>\n\n\t \t\t\t<li>\n\t \t\t\t\t<a class=\"waves-effect waves-light btn\" [routerLink]=\"['/offer']\">Abonnement aanbieden</a>\n\t \t\t\t</li>\n\t \t\t</ul>\n\t \t</div>\n\t </nav>\n\t ",
        styleUrls: ['../../../css/headerAdmin.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], HeaderAdmin);
exports.HeaderAdmin = HeaderAdmin;
//# sourceMappingURL=Header.js.map