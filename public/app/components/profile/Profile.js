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
var Profile = (function () {
    function Profile(router, http, authHttp, apiService) {
        this.router = router;
        this.http = http;
        this.authHttp = authHttp;
        this.apiService = apiService;
        this.modalActions = new core_1.EventEmitter();
        this.modalActions2 = new core_1.EventEmitter();
        this.modalActions3 = new core_1.EventEmitter();
        this.modalActions4 = new core_1.EventEmitter();
        this.modalActions5 = new core_1.EventEmitter();
        this.modalActions6 = new core_1.EventEmitter();
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.showFavorites = false;
        this.showNew = false;
        this.teams = [];
        this.user = [];
        this.today = new Date();
        this.selectOptions = [];
        this.teamsRaw = [];
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('id_token');
    }
    Profile.prototype.save = function (event) {
        var _this = this;
        var birthdate = new Date(this.date_of_birth);
        console.log(birthdate);
        var body = {
            name: this.name,
            firstname: this.firstname,
            street: this.street,
            number: this.number,
            city: this.city,
            postal: this.postal,
            country: this.country,
            email: this.email,
            avatar: this.avatar,
            date_of_birth: birthdate,
            phone: this.phone,
            national_registry_number: "96.05.05-342.01"
        };
        console.log(body);
        this.apiService.putWithFiles("api/users", body, function (data) {
            if (data) {
                _this.showProfileModal();
            }
        });
    };
    Profile.prototype.changePass = function (event) {
        var _this = this;
        var body = {
            old_password: this.password_old,
            new_password: this.password
        };
        this.apiService.post("api/users/update/password", body).subscribe(function (response) { return _this.showPasswordModal(); }, function (error) { return _this.response = error.text; });
    };
    Profile.prototype.updateAbbo = function (event) {
        var _this = this;
        var body = {
            place: this.plaats,
            subscription: this.abbo,
            team: this.team
        };
        this.apiService.postWithFiles("api/subscriptions", body, function (data) {
            if (data) {
                _this.showAbboModel();
            }
        });
    };
    Profile.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.loggedIn) {
            this.router.navigateByUrl('/');
        }
        this._callApi("Anonymous", "api/users");
        this.apiService.get("api/countries").subscribe(function (response) { return _this.getCountries(response.text()); }, function (error) { return _this.response = error.text; });
        this.apiService.get("api/teams").subscribe(function (response) { return _this.showTeams(response.text()); }, function (error) { return _this.response = error.text; });
    };
    Profile.prototype.showTeams = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.teamsRaw = jsonData.data;
    };
    Profile.prototype.getCountries = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.selectOptions = jsonData.data;
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
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.user = jsonData.data;
        this.favorites = jsonData.data.favorites;
        if (!this.isEmpty(this.favorites)) {
            this.showFavorites = true;
        }
        this.getTeams();
        console.log(this.user);
        this.name = this.user.name;
        this.firstname = this.user.firstname;
        this.email = this.user.email;
        document.getElementById("namelbl").classList.add("active");
        document.getElementById("firstnamelbl").classList.add("active");
        document.getElementById("emaillbl").classList.add("active");
        if (("address" in this.user)) {
            this.street = this.user.address.street;
            this.number = this.user.address.number;
            this.city = this.user.address.city;
            this.postal = this.user.address.postal;
            this.country = this.user.address.country;
            document.getElementById("streetlbl").classList.add("active");
            document.getElementById("numberlbl").classList.add("active");
            document.getElementById("citylbl").classList.add("active");
            document.getElementById("postallbl").classList.add("active");
        }
        if ("phone" in this.user) {
            this.phone = this.user.phone;
            document.getElementById("phonelbl").classList.add("active");
        }
        if ("date_of_birth" in this.user) {
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var date = new Date(this.user.date_of_birth);
            var day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
            this.date_of_birth = day + " " + monthNames[month] + ", " + year;
            document.getElementById("date_of_birthlbl").classList.add("active");
        }
        if ("avatar" in this.user) {
            this.avatar = this.user.avatar;
        }
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
    Profile.prototype.showProfileModal = function () {
        this.modalActions4.emit({ action: "modal", params: ['open'] });
    };
    Profile.prototype.showPasswordModal = function () {
        this.modalActions5.emit({ action: "modal", params: ['open'] });
    };
    Profile.prototype.showAbboModel = function () {
        this.modalActions6.emit({ action: "modal", params: ['open'] });
    };
    Profile.prototype.closeProfileModal = function () {
        this.modalActions4.emit({ action: "modal", params: ['close'] });
    };
    Profile.prototype.closePasswordModal = function () {
        this.modalActions5.emit({ action: "modal", params: ['close'] });
    };
    Profile.prototype.closeAbboModal = function () {
        this.modalActions6.emit({ action: "modal", params: ['close'] });
    };
    Profile.prototype.closeModal1 = function () {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    };
    Profile.prototype.closeModal = function () {
        this.modalActions2.emit({ action: "modal", params: ['close'] });
        this.showFavoritesBack();
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
    Profile.prototype.getTeams = function () {
        var counter = 0;
        var teamsRaw = this.teamsRaw;
        console.log(this.teamsRaw);
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
        select = select.options[select.selectedIndex].value;
        console.log(select);
        var apiString = "api/teams/favorite/" + select;
        this.apiService.post(apiString, null).subscribe(function (response) { return _this.showFavoritesBack(); }, function (error) { return console.log(error.text); });
    };
    Profile.prototype.isEmpty = function (obj) {
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
    Profile.prototype.selectAvatar = function (event) {
        var input = event.target;
        if (input && input.files[0]) {
            this.avatar = input.files[0];
        }
    };
    Profile.prototype.selectAbbo = function (event) {
        var input = event.target;
        if (input && input.files[0]) {
            this.abbo = input.files[0];
        }
    };
    return Profile;
}());
Profile = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: './app/components/profile/profile.view.html',
        styleUrls: ['../../css/profile.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, ApiService_1.ApiService])
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map