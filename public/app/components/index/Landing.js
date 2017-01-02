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
var angular2_jwt_1 = require("angular2-jwt");
var $ = require("jquery");
require("slick");
var ApiService_1 = require("../../services/ApiService");
var Landing = (function () {
    function Landing(router, http, authHttp, apiService) {
        this.router = router;
        this.http = http;
        this.authHttp = authHttp;
        this.apiService = apiService;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        //default Belgium, I guess
        this.compId = "1";
    }
    Landing.prototype.ngOnInit = function () {
        this._callApi("Anonymous", "api/teams/comp/" + this.compId);
    };
    Landing.prototype.useJwtHelper = function () {
        var token = localStorage.getItem("id_token");
        console.log("Token:", token);
        console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
    };
    Landing.prototype.search = function () {
    };
    Landing.prototype._callApi = function (type, url) {
        var _this = this;
        this.apiService.call(url).subscribe(function (response) { return _this.getTeam(response.text()); }, function (error) { return _this.response = error.text; });
    };
    Landing.prototype.getTeam = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.jsonDataData = jsonData.data;
        this.displayCarousel();
    };
    Landing.prototype.displayCarousel = function () {
        $('.carousel-class').slick({ infinite: true, autoplay: true, arrows: false,
            slidesToShow: 12,
            slidesToScroll: 1 });
    };
    Landing.prototype.test = function () {
        console.log("test");
    };
    Landing.prototype.goToTeamPage = function (id) {
        //route to teampage
        alert(id);
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
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, ApiService_1.ApiService])
], Landing);
exports.Landing = Landing;
//# sourceMappingURL=Landing.js.map