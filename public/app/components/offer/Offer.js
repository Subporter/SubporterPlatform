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
var ApiService_1 = require("../../services/ApiService");
require("materialize-css");
require("angular2-materialize");
var $ = require("jquery");
var Offer = (function () {
    function Offer(router, http, authHttp, apiService) {
        this.router = router;
        this.http = http;
        this.authHttp = authHttp;
        this.apiService = apiService;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.gameNames = [];
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('id_token');
    }
    Offer.prototype.ngOnInit = function () {
        if (!this.loggedIn) {
            this.show = false;
        }
        else {
            this._callApi("Anonymous", "api/games/");
        }
    };
    Offer.prototype.useJwtHelper = function () {
        var token = localStorage.getItem("id_token");
        console.log("Token:", token);
        console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
    };
    Offer.prototype._callApi = function (type, url) {
        var _this = this;
        this.apiService.get(url).subscribe(function (response) { return _this.getGames(response.text()); }, function (error) { return _this.response = error.text; });
    };
    Offer.prototype.getGames = function (data) {
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
    Offer.prototype.nextTab = function () {
        var game = $(".autocomplete").val();
        var parts = game.split(" ");
        var id = parts[0];
        if (parseInt(id)) {
            id = parseInt(id);
        }
        else {
            alert("Je hebt geen juiste wedstrijd geselecteerd.");
        }
    };
    return Offer;
}());
Offer = __decorate([
    core_1.Component({
        selector: 'offer',
        templateUrl: './app/components/offer/offer.view.html',
        styleUrls: ['../../css/css/offer.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, ApiService_1.ApiService])
], Offer);
exports.Offer = Offer;
//# sourceMappingURL=Offer.js.map