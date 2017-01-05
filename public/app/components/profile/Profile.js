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
var UploadService_1 = require("../../services/UploadService");
var Profile = (function () {
    function Profile(router, http, authHttp, apiService, service) {
        this.router = router;
        this.http = http;
        this.authHttp = authHttp;
        this.apiService = apiService;
        this.service = service;
        this.modalActions = new core_1.EventEmitter();
        this.modalActions2 = new core_1.EventEmitter();
        this.modalActions3 = new core_1.EventEmitter();
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.showFavorites = false;
        this.showNew = false;
        this.teams = [];
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('id_token');
        //    this.service.progress$.subscribe(
        //   data => {
        //     console.log('progress = '+data);
        //   });
    }
    // changePass(event) {
    //     console.log('onChange');
    //     var files = event.srcElement.files;
    //     console.log(files);
    //     this.service.makeFileRequest('http://localhost:1337/api/subscriptions', [], files).subscribe(() => {
    //       console.log('sent');
    //     });
    //   }
    //   save (data?:any) {
    //       console.log("Data", data);
    //       this.form1 = data;
    //       return false;
    //   }
    Profile.prototype.ngOnInit = function () {
        if (!this.loggedIn) {
            this.router.navigateByUrl('/');
        }
        this._callApi("Anonymous", "api/users");
    };
    Profile.prototype.useJwtHelper = function () {
        var token = localStorage.getItem("id_token");
        console.log("Token:", token);
        console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
    };
    Profile.prototype._callApi = function (type, url) {
        var _this = this;
        this.apiService.get(url).subscribe(function (response) { return _this.getUser(response.text()); }, function (error) { return _this.response = error.text; });
    };
    Profile.prototype.getUser = function (data) {
        var _this = this;
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.user = jsonData.data;
        this.favorites = this.user.favorites;
        if (!this.isEmpty(this.favorites)) {
            this.showFavorites = true;
        }
        this.apiService.get("api/teams").subscribe(function (response) { return _this.getTeams(response.text()); }, function (error) { return _this.response = error.text; });
        console.log(this.user);
    };
    Profile.prototype.removeFavorite = function (id) {
        this.modalActions.emit({ action: "modal", params: ['open'] });
        this.favoriteId = id;
    };
    Profile.prototype.removeFavoriteReal = function () {
        var _this = this;
        this.apiService.post("api/teams/favorite/" + this.favoriteId, null).subscribe(function (response) { return _this.showSuccess(); }, function (error) { return _this.response = error.text; });
    };
    Profile.prototype.showSuccess = function () {
        this.modalActions2.emit({ action: "modal", params: ['open'] });
    };
    Profile.prototype.closeModal1 = function () {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    };
    Profile.prototype.closeModal = function () {
        this.modalActions2.emit({ action: "modal", params: ['close'] });
        location.reload();
    };
    Profile.prototype.closeModal3 = function () {
        this.modalActions3.emit({ action: "modal", params: ['close'] });
    };
    Profile.prototype.showAdd = function () {
        this.showFavorites = false;
        this.showNew = true;
    };
    Profile.prototype.showFavoritesBack = function () {
        this._callApi("Anonymous", "api/users");
        this.showFavorites = true;
        this.showNew = false;
    };
    Profile.prototype.getTeams = function (data) {
        var counter = 0;
        var Data = data;
        var jsonData = JSON.parse(Data);
        var teamsRaw = jsonData.data;
        for (var _i = 0, teamsRaw_1 = teamsRaw; _i < teamsRaw_1.length; _i++) {
            var team = teamsRaw_1[_i];
            var success = true;
            for (var _a = 0, _b = this.favorites; _a < _b.length; _a++) {
                var favorite = _b[_a];
                if (team._id == favorite._id) {
                    success = false;
                }
            }
            if (success === true) {
                this.teams[counter] = team;
                counter++;
            }
        }
        console.log(this.teams);
    };
    Profile.prototype.updateFavorite = function () {
        var _this = this;
        var select = document.getElementById('select');
        var select = select.value;
        this.apiService.post("api/teams/favorite/" + this.favoriteId, null).subscribe(function (response) { return _this.showFavoritesBack(); }, function (error) { return _this.response = error.text; });
    };
    Profile.prototype.isEmpty = function (obj) {
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
    return Profile;
}());
Profile = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: './app/components/profile/profile.view.html',
        styleUrls: ['../../css/css/profile.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, ApiService_1.ApiService, UploadService_1.UploadService])
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map