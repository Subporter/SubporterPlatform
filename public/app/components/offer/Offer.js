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
        this.modalActions = new core_1.EventEmitter();
        this.modalActions2 = new core_1.EventEmitter();
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.show = true;
        this.gameNames = [];
        this.user = [];
        this.show2 = false;
        this.show3 = false;
        this.show4 = true;
        this.subscriptions = [];
        this.sub = false;
        this.used = false;
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('id_token');
    }
    Offer.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = false;
        if (!this.loggedIn) {
            this.show = false;
        }
        else {
            var user = "api/users/";
            this.apiService.get(user).subscribe(function (response) { return _this.getSubscriptions(response.text()); }, function (error) { return _this.response = error.text; });
        }
    };
    Offer.prototype.getSubscriptions = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        var user = jsonData.data;
        this.user = user;
        console.log(user);
        if (!this.isEmpty(user.subscriptions)) {
            this._callApi("Anonymous", "api/games/");
        }
        else {
            this.show2 = false;
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
    Offer.prototype.isEmpty = function (obj) {
        // null and undefined are "empty"
        if (obj == null)
            return true;
        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)
            return false;
        if (obj.length === 0)
            return true;
        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object")
            return true;
        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key))
                return false;
        }
        return true;
    };
    Offer.prototype.showAbbo = function () {
        var game = $(".autocomplete").val();
        var parts = game.split(" ");
        var id = parts[0];
        if (parseInt(id)) {
            var selectedGame = void 0;
            this.gameId = parseInt(id);
            var gameId = this.gameId;
            for (var _i = 0, _a = this.games; _i < _a.length; _i++) {
                var game_1 = _a[_i];
                if (gameId == game_1._id) {
                    selectedGame = game_1;
                }
            }
            console.log(selectedGame);
            var user = this.user;
            var subscriptions = user.subscriptions;
            var counter = 0;
            console.log(subscriptions);
            if (selectedGame) {
                this.selectedGame = selectedGame;
                this.selectedGameLoans = selectedGame.loans;
                this.teamHome = selectedGame.home.name;
                this.teamAway = selectedGame.away.name;
                this.gameDate = selectedGame.date;
                for (var _b = 0, subscriptions_1 = subscriptions; _b < subscriptions_1.length; _b++) {
                    var subscription = subscriptions_1[_b];
                    if (subscription.team._id == selectedGame.home._id) {
                        for (var _c = 0, _d = this.selectedGameLoans; _c < _d.length; _c++) {
                            var loan = _d[_c];
                            if (loan.subscription._id == subscription._id) {
                                this.used = true;
                            }
                        }
                        if (!this.used) {
                            this.subscriptions[counter] = subscription;
                            this.sub = true;
                            counter++;
                        }
                        else {
                            this.sub = true;
                        }
                    }
                }
                if (this.sub === false) {
                    alert("Je hebt geen abonnement voor deze wedstrijd.");
                }
                else {
                    this.show4 = false;
                    this.show3 = false;
                    this.show2 = true;
                }
            }
        }
        else {
            alert("Je hebt geen juiste wedstrijd geselecteerd.");
        }
        if (this.isEmpty(selectedGame)) {
            alert("Je hebt geen juiste wedstrijd geselecteerd.");
        }
    };
    Offer.prototype.showWeds = function () {
        this.show4 = true;
        this.show3 = false;
        this.show2 = false;
    };
    Offer.prototype.showAbbo2 = function () {
        this.show4 = false;
        this.show3 = false;
        this.show2 = true;
    };
    Offer.prototype.showBeve = function (id) {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var subscription = _a[_i];
            if (id == subscription._id) {
                this.selectedSubscription = subscription;
                this.place = subscription.place;
            }
        }
        this.show4 = false;
        this.show3 = true;
        this.show2 = false;
    };
    Offer.prototype.offerSubscription = function () {
        var _this = this;
        var game = this.selectedGame._id;
        var subscription = this.selectedSubscription._id;
        var body = JSON.stringify({
            game: game,
            subscription: subscription
        });
        this.apiService.post("api/loans", body).subscribe(function (response) { return _this.showSuccess(); }, function (error) { return _this.response = error.text; });
    };
    Offer.prototype.showSuccess = function () {
        console.log(this.selectedGame.home["_id"]);
        var socket = io.connect();
        socket.emit("offerAdded", this.selectedGame.home["_id"], this.selectedGame.away["_id"]);
        this.modalActions2.emit({ action: "modal", params: ['open'] });
    };
    Offer.prototype.openModal = function () {
        this.modalActions.emit({ action: "modal", params: ['open'] });
    };
    Offer.prototype.closeModal = function () {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    };
    return Offer;
}());
Offer = __decorate([
    core_1.Component({
        selector: 'offer',
        templateUrl: './app/components/offer/offer.view.html',
        styleUrls: ['../../css/offer.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, ApiService_1.ApiService])
], Offer);
exports.Offer = Offer;
//# sourceMappingURL=Offer.js.map