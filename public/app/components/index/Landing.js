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
var $ = require("jquery");
require("slick");
var Landing = (function () {
    function Landing() {
    }
    Landing.prototype.ngOnInit = function () {
        $('.carousel-class').slick({ infinite: true, autoplay: true, arrows: false,
            slidesToShow: 12,
            slidesToScroll: 1 });
    };
    Landing.prototype.search = function () {
        console.log("test");
    };
    Landing.prototype.test = function () {
        console.log("test");
    };
    Landing.prototype.scrollToDiv = function () {
        $('html, body').animate({
            scrollTop: $("#section1").offset().top
        }, 1000);
    };
    return Landing;
}());
Landing = __decorate([
    core_1.Component({
        selector: 'landing',
        templateUrl: './app/components/index/landing.view.html',
        styleUrls: ['../../css/css/landing.css']
    }),
    __metadata("design:paramtypes", [])
], Landing);
exports.Landing = Landing;
//# sourceMappingURL=Landing.js.map