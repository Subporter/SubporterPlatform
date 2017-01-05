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
        this.gameNames = [];
        //default Belgium, I guess
        this.compId = "1";
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('id_token');
    }
    Landing.prototype.ngOnInit = function () {
        var _this = this;
        this._callApi("Anonymous", "api/teams/competition/" + this.compId);
        // this._callApi("kek", "api/users");
        this.apiService.get("api/games/featured/1").subscribe(function (response) { return _this.getFeaturedGames(response.text()); }, function (error) { return _this.response = error.text; });
        this.apiService.get("api/games/").subscribe(function (response) { return _this.showGames(response.text()); }, function (error) { return _this.response = error.text; });
    };
    Landing.prototype.useJwtHelper = function () {
        var token = localStorage.getItem("id_token");
        console.log("Token:", token);
        console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
    };
    Landing.prototype.showGames = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.games = jsonData.data;
        var obj = "{";
        for (var _i = 0, _a = this.games; _i < _a.length; _i++) {
            var game = _a[_i];
            var home = game.home.name;
            var away = game.away.name;
            var gamename = "\"" + game._id + " " + home + " - " + away + "\"";
            obj = obj + gamename + ": null,";
        }
        obj = obj.substring(0, obj.length - 1);
        obj = obj + "}";
        obj = JSON.parse(obj);
        this.gameNames = obj;
        console.log(obj);
    };
    Landing.prototype._callApi = function (type, url) {
        var _this = this;
        this.apiService.get(url).subscribe(function (response) { return _this.getTeam(response.text()); }, function (error) { return _this.response = error.text; });
    };
    Landing.prototype.getFeaturedGames = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.featuredGames = jsonData.data;
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
    Landing.prototype.search = function () {
        var game = $(".autocomplete").val();
        var parts = game.split(" ");
        var id = parts[0];
        if (parseInt(id)) {
            id = parseInt(id);
            var location_1 = "evenement/" + id;
            window.location.assign(location_1);
        }
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