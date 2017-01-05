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
var Header = (function () {
    function Header(router, http) {
        this.router = router;
        this.http = http;
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('id_token');
    }
    return Header;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Header.prototype, "header1", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Header.prototype, "header2", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Header.prototype, "image", void 0);
Header = __decorate([
    core_1.Component({
        selector: 'navmenu',
        template: "\n\n\n    <div class=\"header\" [ngStyle]=\"{ 'background-image':  'url(../../../..'+image+')' }\">\n   \n \n\t <nav>\n    <div class=\"nav-wrapper\">\n      <a [routerLink]=\"['/']\"  class=\"brand-logo\">Subporter</a>\n<a href=\"#\" data-activates=\"mobile-demo\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\n      <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n        <li><a href=\"sass.html\">Info</a></li>\n        <li> <a  [routerLink]=\"['/search']\">Zoeken</a></li>\n        <li *ngIf=\"loggedIn\"><a  [routerLink]=\"['/cart']\">Winkelwagen</a></li>\n\n        <li *ngIf=\"!loggedIn\"><a  [routerLink]=\"['/login']\">Login</a></li>\n        <li *ngIf=\"loggedIn\"><a  [routerLink]=\"['/profiel']\">Profile</a></li>\n\n        <li><a class=\"waves-effect waves-light btn\" [routerLink]=\"['/offer']\">Abonnement aanbieden</a></li>\n      </ul>\n      <ul class=\"side-nav\" id=\"mobile-demo\">\n        <li><a href=\"sass.html\">Sass</a></li>\n        <li><a href=\"badges.html\">Components</a></li>\n        <li><a href=\"collapsible.html\">JavaScript</a></li>\n      </ul>\n    </div>\n  </nav>\n\n\n<div class=\"container\">\n   <h1>{{header1}}</h1>\n   <h2>{{header2}}</h2>\n\n</div>\n</div>\n\t \n\n\t \n\t ",
        styles: ['.header .container{ text-align: center;} .header .container h1{color: #fff;font-weight: 600; font-size:3em;} .header .container h2{color:#fff;font-size:2em;} .header{background-size: cover; height: 300px;}nav{background: none; -webkit-box-shadow: none; -moz-box-shadow: none;	box-shadow: none;}.brand-logo{margin-left: 10px;}']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], Header);
exports.Header = Header;
//# sourceMappingURL=Header.js.map