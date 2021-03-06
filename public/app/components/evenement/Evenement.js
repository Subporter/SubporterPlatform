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
var ApiService_1 = require("../../services/ApiService");
var Evenement = (function () {
    function Evenement(router, http, apiService, activatedRoute) {
        this.router = router;
        this.http = http;
        this.apiService = apiService;
        this.activatedRoute = activatedRoute;
        this.loans = [];
        this.lent = 0;
        this.lendable = 0;
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('id_token');
    }
    Evenement.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (param) {
            var id = param['id'];
            var socket = io.connect();
            socket.on("newLoanServer", function (dataS) {
                console.log("socket new loan: " + dataS);
                location.reload();
            });
            socket.emit("eventRoomClient", id);
            _this.gameId = id;
            _this._callApi("Anonymous", "api/loans/game/" + id);
        });
    };
    Evenement.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    Evenement.prototype._callApi = function (type, url) {
        var _this = this;
        this.apiService.get(url).subscribe(function (response) { return _this.getGames(response.text()); }, function (error) { return _this.goHome(); });
    };
    Evenement.prototype.getGames = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.game = jsonData.data;
        if (this.isEmpty(this.game)) {
            this.router.navigateByUrl('/landing');
        }
        this.home = jsonData.data[0].game.home.name;
        this.away = jsonData.data[0].game.away.name;
        this.date = jsonData.data[0].game.date;
        this.stadion = jsonData.data[0].game.home.stadion;
        this.banner = jsonData.data[0].game.banner;
        this.price = jsonData.data[0].game.home.price;
        this.test = jsonData.data[0].game.home;
        this.lent = jsonData.count;
        var loansRaw = jsonData.data;
        if (this.loggedIn) {
            this.getUserId(loansRaw);
        }
        else {
            this.loans = jsonData.data;
        }
    };
    Evenement.prototype.goToOffer = function () {
        this.router.navigateByUrl("/offer");
    };
    Evenement.prototype.getUserId = function (loans) {
        var _this = this;
        this.apiService.get("api/users").subscribe(function (response) { return _this.filterLoans(response.text(), loans); }, function (error) { return _this.goHome(); });
    };
    Evenement.prototype.filterLoans = function (data, loans) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        var user = jsonData.data;
        var userId = user._id;
        var loansRaw = loans;
        var counter = 0;
        for (var _i = 0, loansRaw_1 = loansRaw; _i < loansRaw_1.length; _i++) {
            var loan = loansRaw_1[_i];
            if (loan.lent_out_by._id != userId) {
                this.loans[counter] = loan;
                counter++;
            }
        }
        if (!this.isEmpty(this.loans)) {
            this.size = this.loans.length;
            this.lendable = this.loans.length;
        }
    };
    Evenement.prototype.isEmpty = function (obj) {
        if (obj == null)
            return true;
        if (obj.length > 0)
            return false;
        if (obj.length === 0)
            return true;
        if (typeof obj !== "object")
            return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key))
                return false;
        }
        return true;
    };
    return Evenement;
}());
Evenement = __decorate([
    core_1.Component({
        selector: 'evenement',
        templateUrl: './app/components/evenement/evenement.view.html',
        styleUrls: ['../../css/evenement.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, ApiService_1.ApiService, router_1.ActivatedRoute])
], Evenement);
exports.Evenement = Evenement;
//# sourceMappingURL=Evenement.js.map