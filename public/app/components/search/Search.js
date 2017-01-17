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
var Search = (function () {
    function Search(router, http, authHttp, apiService) {
        this.router = router;
        this.http = http;
        this.authHttp = authHttp;
        this.apiService = apiService;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('id_token');
    }
    Search.prototype.ngOnInit = function () {
        this._callApi("Anonymous", "api/games/");
    };
    // ngAfterViewInit() {
    // 	$(".filterSearch").on('keyup', function (e) {
    // 		if (e.keyCode == 13) {
    // 			let value = $(".filterSearch").val();
    // 			this.keyword = value;
    // 			console.log(this.keyword);
    // 		}
    // 	});
    // }
    Search.prototype.filterKeyword = function () {
        var value = $(".filterSearch").val();
        this.keyword = value;
        this.filterGames();
    };
    Search.prototype.filterGames = function () {
        var gamesFilter = [];
        for (var _i = 0, _a = this.gamesCopy; _i < _a.length; _i++) {
            var game = _a[_i];
            var home = game.home.name;
            var away = game.away.name;
            if (home.toLowerCase().includes(this.keyword.toLowerCase()) || away.toLowerCase().includes(this.keyword.toLowerCase())) {
                gamesFilter.push(game);
            }
        }
        this.games = gamesFilter;
    };
    Search.prototype.removeKeyword = function () {
        this.keyword = "";
        this.games = this.gamesCopy;
    };
    Search.prototype.filterCountry = function (countryId) {
        this.getCountryById(countryId);
        var gamesFilter = [];
        for (var _i = 0, _a = this.gamesCopy; _i < _a.length; _i++) {
            var game = _a[_i];
            var country = game.competition.country._id;
            if (country == countryId) {
                gamesFilter.push(game);
            }
        }
        this.games = gamesFilter;
        if (this.isEmpty(this.games)) {
        }
    };
    Search.prototype.getCountryById = function (id) {
        var _this = this;
        var url = "api/countries/" + id;
        this.apiService.get(url).subscribe(function (response) { return _this.showCountry(response.text()); }, function (error) { return _this.response = error.text; });
    };
    Search.prototype.showCountry = function (data) {
        console.log(data);
        var Data = data;
        var jsonData = JSON.parse(Data);
        var country = jsonData.data;
        this.country = country.name;
    };
    Search.prototype.filterCountryKeyword = function () {
        this.country = $(".filterCountrySearch").val();
        var gamesFilter = [];
        for (var _i = 0, _a = this.gamesCopy; _i < _a.length; _i++) {
            var game = _a[_i];
            var countryName = game.competition.country.name;
            if (countryName.includes(this.country.toLowerCase())) {
                gamesFilter.push(game);
            }
        }
        this.games = gamesFilter;
    };
    Search.prototype.removeCountry = function () {
        this.country = "";
        this.games = this.gamesCopy;
    };
    Search.prototype.filterDate = function (date) {
        this.date = date;
        var searchDate;
        var endDate;
        switch (date) {
            case "today":
                searchDate = new Date();
                endDate = null;
                break;
            case "tomorrow":
                searchDate = new Date();
                searchDate.setDate(searchDate.getDate() + 1);
                break;
            case "weekend":
                searchDate = this.getFriday();
                endDate = this.getSunday();
                break;
            case "week":
                searchDate = this.getMonday();
                endDate = this.getSunday();
                break;
            case "nextWeek":
                searchDate = this.getMondayNext();
                endDate = this.getSundayNext();
                break;
            case "month":
                var dateMonth = new Date();
                searchDate = new Date(dateMonth.getFullYear(), dateMonth.getMonth(), 1);
                endDate = new Date(dateMonth.getFullYear(), dateMonth.getMonth() + 1, 0);
                break;
        }
        if (endDate != null) {
            var gamesFilter = [];
            for (var _i = 0, _a = this.gamesCopy; _i < _a.length; _i++) {
                var game = _a[_i];
                var date_1 = new Date(game.date);
                if (this.checkDateRange(searchDate, endDate, date_1)) {
                    gamesFilter.push(game);
                }
            }
            this.games = gamesFilter;
        }
        else {
            var gamesFilter = [];
            for (var _b = 0, _c = this.gamesCopy; _b < _c.length; _b++) {
                var game = _c[_b];
                var date_2 = new Date(game.date);
                if (this.isEqual(searchDate, date_2)) {
                    gamesFilter.push(game);
                }
            }
            this.games = gamesFilter;
        }
    };
    Search.prototype.removeDate = function () {
        this.date = "";
        this.games = this.gamesCopy;
    };
    Search.prototype.useJwtHelper = function () {
        var token = localStorage.getItem("id_token");
        console.log("Token:", token);
        console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
    };
    Search.prototype._callApi = function (type, url) {
        var _this = this;
        this.apiService.get(url).subscribe(function (response) { return _this.getGames(response.text()); }, function (error) { return _this.response = error.text; });
    };
    Search.prototype.getGames = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.games = jsonData.data;
        this.gamesCopy = this.games;
        console.log(this.games);
    };
    Search.prototype.isEmpty = function (obj) {
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
    Search.prototype.getMonday = function () {
        var d = new Date();
        var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    };
    Search.prototype.getFriday = function () {
        var d = new Date();
        var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        diff += 4;
        return new Date(d.setDate(diff));
    };
    Search.prototype.getSunday = function () {
        var d = new Date();
        var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        diff += 6;
        return new Date(d.setDate(diff));
    };
    Search.prototype.getMondayNext = function () {
        var d = new Date();
        var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        diff += 7;
        return new Date(d.setDate(diff));
    };
    Search.prototype.getSundayNext = function () {
        var d = new Date();
        var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        diff += 13;
        return new Date(d.setDate(diff));
    };
    Search.prototype.isEqual = function (startDate, endDate) {
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        return endDate.valueOf() == startDate.valueOf();
    };
    Search.prototype.checkDateRange = function (searchDate, endDate, date) {
        searchDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        if (date <= endDate && date >= searchDate) {
            return true;
        }
        else {
            return false;
        }
    };
    return Search;
}());
Search = __decorate([
    core_1.Component({
        selector: 'search',
        templateUrl: './app/components/search/search.view.html',
        styleUrls: ['../../css/search.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, ApiService_1.ApiService])
], Search);
exports.Search = Search;
//# sourceMappingURL=Search.js.map