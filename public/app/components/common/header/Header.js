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
var Auth_1 = require("../../../services/Auth");
var ApiService_1 = require("../../../services/ApiService");
var Header = (function () {
    function Header(router, auth, apiService) {
        this.router = router;
        this.auth = auth;
        this.apiService = apiService;
        this.isAdmin = false;
        this.loggedIn = false;
    }
    Header.prototype.ngOnInit = function () {
        var _this = this;
        this.loggedIn = this.auth.isLoggedIn();
        this.apiService.get('check/admin').subscribe(function (response) {
            var result = JSON.parse(response.text()).success;
            _this.isAdmin = result;
        }, function (error) {
            _this.isAdmin = false;
        });
    };
    Header.prototype.logout = function () {
        localStorage.removeItem('id_token');
        this.router.navigate(['/landing']);
    };
    return Header;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Header.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Header.prototype, "subtitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Header.prototype, "image", void 0);
Header = __decorate([
    core_1.Component({
        selector: 'subporter-header',
        template: "\n   <header class=\"header\" [ngStyle]=\"{ 'background-image':  'url('+image+')' }\">\n\t<nav>\n   <div class=\"nav-wrapper\">\n\t\t\t<a [routerLink]=\"['/']\" class=\"brand-logo\">Subporter</a>\n\t\t\t<a materialize=\"sideNav\" href=\"#\" data-activates=\"slide-out\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\n\t\t\t<ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n\t\t\t\t<li> <a [routerLink]=\"['/search']\">Zoeken</a></li>\n\t\t\t\t<li *ngIf=\"isAdmin\"><a [routerLink]=\"['/admin']\">Admin</a></li>\n\t\t\t\t<li *ngIf=\"loggedIn\"><a [routerLink]=\"['/cart']\">Winkelwagen</a></li>\n\t\t\t\t<li *ngIf=\"!loggedIn\"><a [routerLink]=\"['/login']\">Login</a></li>\n\t\t\t\t<li *ngIf=\"loggedIn\"><a [routerLink]=\"['/profile']\">Profiel</a></li>\n\t\t\t\t<li *ngIf=\"loggedIn\"><a (click)=\"logout()\">Logout</a></li>\n\t\t\t\t<li><a class=\"waves-effect waves-light btn\" [routerLink]=\"['/offer']\">Abonnement aanbieden</a></li>\n\t\t\t</ul>\n\t\t\t<ul class=\"side-nav\" id=\"slide-out\">\n\t\t\t\t<li> <a [routerLink]=\"['/search']\">Zoeken</a></li>\n\t\t\t\t<li *ngIf=\"isAdmin\"><a [routerLink]=\"['/admin']\">Admin</a></li>\n\t\t\t\t<li *ngIf=\"loggedIn\"><a [routerLink]=\"['/cart']\">Winkelwagen</a></li>\n\t\t\t\t<li *ngIf=\"!loggedIn\"><a [routerLink]=\"['/login']\">Login</a></li>\n\t\t\t\t<li *ngIf=\"loggedIn\"><a [routerLink]=\"['/profile']\">Profiel</a></li>\n\t\t\t\t<li *ngIf=\"loggedIn\"><a (click)=\"logout()\">Logout</a></li>\n\t\t\t\t<li><a class=\"waves-effect waves-light btn\" [routerLink]=\"['/offer']\">Abonnement aanbieden</a></li>\n\t\t\t</ul>\n\t\t</div>\n  </nav>\n\t<div class=\"container\">\n\t\t<h1>{{title}}</h1>\n\t\t<h2>{{subtitle}}</h2>\n\t</div>\n</header>\n\t",
        styles: ['.header .container{ text-align: center;} .header .container h1{color: #fff;font-weight: 600; font-size:3em;} .header .container h2{color:#fff;font-size:2em;} .header{background-size: cover; height: 300px;}nav{background: none; -webkit-box-shadow: none; -moz-box-shadow: none;	box-shadow: none;}.brand-logo{margin-left: 10px;}']
    }),
    __metadata("design:paramtypes", [router_1.Router, Auth_1.Auth, ApiService_1.ApiService])
], Header);
exports.Header = Header;
//# sourceMappingURL=Header.js.map