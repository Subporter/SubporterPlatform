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
var Footer = (function () {
    function Footer() {
    }
    return Footer;
}());
Footer = __decorate([
    core_1.Component({
        selector: 'subporter-footer',
        template: "\n    <footer class=\"page-footer\">\n    \t<div class=\"container\">\n    \t\t<div class=\"row\">\n    \t\t\t<div class=\"col l4 s12\">\n    \t\t\t\t<h5 class=\"white-text\">Subporter</h5>\n    \t\t\t\t<ul>\n    \t\t\t\t\t<li><a [routerLink]=\"['/']\" class=\"grey-text\">Home</a></li>\n    \t\t\t\t\t<li><a [routerLink]=\"['/search']\" class=\"grey-text\">Zoeken</a></li>\n    \t\t\t\t\t<li><a [routerLink]=\"['/login']\" class=\"grey-text\">Login</a></li>\n    \t\t\t\t\t<li><a [routerLink]=\"['/register']\" class=\"grey-text\">Registreer</a></li>\n    \t\t\t\t</ul>\n    \t\t\t</div>\n    \t\t\t<div class=\"col l4 s12\">\n    \t\t\t\t<h5 class=\"white-text\">Hulp</h5>\n    \t\t\t\t<ul>\n    \t\t\t\t\t<li><a [routerLink]=\"['/about']\" class=\"grey-text\">Subporter</a></li>\n    \t\t\t\t\t<li><a [routerLink]=\"['/faq']\" class=\"grey-text\">FAQ</a></li>\n    \t\t\t\t\t<li><a [routerLink]=\"['/conditions']\" class=\"grey-text\">Voorwaarden</a></li>\n    \t\t\t\t\t<li><a [routerLink]=\"['/privacy']\" class=\"grey-text\">Privacy</a></li>\n    \t\t\t\t</ul>\n    \t\t\t</div>\n    \t\t\t<div class=\"col l4 s12\">\n    \t\t\t\t<h5 class=\"white-text\">Contact</h5>\n    \t\t\t\t<ul>\n    \t\t\t\t\t<li><a class=\"grey-text\">Graaf Karel de Goedelaan 5</a></li>\n    \t\t\t\t\t<li><a class=\"grey-text\">8500 Kortrijk</a></li>\n    \t\t\t\t\t<li><a class=\"grey-text\" href=\"mailto:info@subpoter.be\">info@subporter.be</a></li>\n    \t\t\t\t\t<li><a class=\"grey-text\">+32 475 53 71 07</a></li>\n    \t\t\t\t</ul>\n    \t\t\t</div>\n    \t\t</div>\n    \t</div>\n    \t<div class=\"footer-copyright\">\n    \t\t<div class=\"container\">\n    \t\t\t<span>&copy; 2017 Subporter</span>\n    \t\t\t<span class=\"right\"><a [routerLink]=\"['/']\" class=\"grey-text\">www.subporter.be</a></span>\n    \t\t</div>\n    \t</div>\n    </footer>\n\t ",
        styleUrls: ['../../css/landing.css']
    }),
    __metadata("design:paramtypes", [])
], Footer);
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map