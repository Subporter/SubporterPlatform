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
var Evenement = (function () {
    function Evenement(router, http, authHttp, apiService, activatedRoute) {
        this.router = router;
        this.http = http;
        this.authHttp = authHttp;
        this.apiService = apiService;
        this.activatedRoute = activatedRoute;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.lent = 0;
        this.lendable = 0;
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('id_token');
    }
    Evenement.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (param) {
            var id = param['id'];
            _this.gameId = id;
            _this._callApi("Anonymous", "api/games/" + id);
        });
    };
    Evenement.prototype.ngOnDestroy = function () {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    };
    Evenement.prototype.useJwtHelper = function () {
        var token = localStorage.getItem("id_token");
        console.log("Token:", token);
        console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
    };
    Evenement.prototype._callApi = function (type, url) {
        var _this = this;
        this.apiService.get(url).subscribe(function (response) { return _this.getGames(response.text()); }, function (error) { return _this.goHome(); });
    };
    Evenement.prototype.getGames = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.game = jsonData.data;
        if (!this.game) {
            this.router.navigateByUrl('../');
        }
        this.home = jsonData.data.home.name;
        this.away = jsonData.data.away.name;
        this.date = jsonData.data.date;
        this.stadion = jsonData.data.home.stadion;
        this.banner = jsonData.data.banner;
        this.loans = jsonData.data.loans;
        this.id = jsonData.data._id;
        this.price = jsonData.data.home.price;
        this.test = jsonData.data.home;
        this.size = this.loans.length;
        for (var i = 0; i < this.loans.length; i++) {
            if (this.loans.paid == true) {
                this.lent++;
                this.loans.splice(i, 1);
            }
            else {
                this.lendable++;
            }
        }
        console.log(this.lendable);
        console.log(this.lent);
    };
    Evenement.prototype.goHome = function () {
    };
    return Evenement;
}());
Evenement = __decorate([
    core_1.Component({
        selector: 'evenement',
        templateUrl: './app/components/evenement/evenement.view.html',
        styleUrls: ['../../css/css/evenement.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, ApiService_1.ApiService, router_1.ActivatedRoute])
], Evenement);
exports.Evenement = Evenement;
//# sourceMappingURL=Evenement.js.map