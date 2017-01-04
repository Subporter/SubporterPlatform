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
var common_1 = require("@angular/common");
var core_2 = require("angular2-cookie/core");
var Listing = (function () {
    function Listing(router, http, authHttp, apiService, activatedRoute, _location, _cookieService) {
        this.router = router;
        this.http = http;
        this.authHttp = authHttp;
        this.apiService = apiService;
        this.activatedRoute = activatedRoute;
        this._location = _location;
        this._cookieService = _cookieService;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('id_token');
    }
    Listing.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (param) {
            var id = param['id'];
            _this.id = id;
            _this._callApi("Anonymous", "api/loans/" + id);
        });
    };
    Listing.prototype.useJwtHelper = function () {
        var token = localStorage.getItem("id_token");
        console.log("Token:", token);
        console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
    };
    Listing.prototype._callApi = function (type, url) {
        var _this = this;
        this.apiService.get(url).subscribe(function (response) { return _this.getLoan(response.text()); }, function (error) { return _this.response = error.text; });
    };
    Listing.prototype.getLoan = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.loan = jsonData.data;
        if (!this.loan) {
            this.router.navigateByUrl('../');
        }
        this.home = jsonData.data.game.home.name;
        this.away = jsonData.data.game.away.name;
        this.date = jsonData.data.game.date;
        this.stadion = jsonData.data.game.home.stadion;
        this.banner = jsonData.data.game.banner;
        this.profile = jsonData.data.lent_out_by;
        this.avatar = jsonData.data.lent_out_by.avatar;
        this.name = jsonData.data.lent_out_by.name;
        this.firstname = jsonData.data.lent_out_by.firstname;
        this.city = jsonData.data.lent_out_by.address.city;
        this.price = jsonData.data.game.home.price;
        console.log(this.profile);
    };
    Listing.prototype.back = function () {
        this._location.back();
    };
    Listing.prototype.huurAbbo = function () {
        if (this.loggedIn) {
            this._cookieService.put(this.id.toString(), this.id.toString());
        }
        else {
            alert("Gelieve eerst in te loggen");
            this.router.navigateByUrl('../login/' + this.id);
        }
    };
    return Listing;
}());
Listing = __decorate([
    core_1.Component({
        selector: 'listings',
        templateUrl: './app/components/listing/listing.view.html',
        styleUrls: ['../../css/css/listing.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, ApiService_1.ApiService, router_1.ActivatedRoute, common_1.Location, core_2.CookieService])
], Listing);
exports.Listing = Listing;
//# sourceMappingURL=Listing.js.map