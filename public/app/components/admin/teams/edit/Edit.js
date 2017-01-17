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
var Countries_1 = require("../../../../modules/Countries");
var Competitions_1 = require("../../../../modules/Competitions");
var ApiService_1 = require("../../../../services/ApiService");
var TeamsEdit = (function () {
    function TeamsEdit(router, route, apiService) {
        this.router = router;
        this.route = route;
        this.apiService = apiService;
        this.countries = [];
        this.competitions = [];
    }
    TeamsEdit.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
            if (!_this.id) {
                _this.router.navigate(['admin/teams']);
            }
        });
        this.loadTeam();
    };
    TeamsEdit.prototype.loadTeam = function () {
        var _this = this;
        this.apiService.get("api/teams/" + this.id).subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                _this.name = result.data.name;
                _this.stadion = result.data.stadion;
                _this.street = result.data.address.street;
                _this.number = result.data.address.number;
                _this.city = result.data.address.city;
                _this.postal = result.data.address.postal;
                _this.country = result.data.address.country._id;
                _this.price = result.data.price;
                _this.competition = result.data.competition._id;
                _this.logoUrl = result.data.logo;
                _this.backgroundUrl = result.data.background;
                _this.loadValues();
            }
            else {
                _this.router.navigate(['admin/competitions']);
            }
        }, function (error) {
            _this.router.navigate(['admin/competitions']);
        });
    };
    TeamsEdit.prototype.loadValues = function () {
        var _this = this;
        this.apiService.get("api/countries").subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                var data = result.data;
                if (data.length != 0) {
                    var countries_1 = [];
                    data.forEach(function (i) {
                        var country = new Countries_1.Country(i._id, i.name, i.featured);
                        countries_1.push(country);
                    });
                    setTimeout(function () {
                        _this.countries = countries_1;
                        _this.loadCompetitions();
                    }, 100);
                }
            }
            else {
                Materialize.toast("Unable to load countries at this time", 2000);
            }
        }, function (error) {
            Materialize.toast("Unable to load countries at this time", 2000);
        });
    };
    TeamsEdit.prototype.loadCompetitions = function () {
        var _this = this;
        this.apiService.get("api/competitions/country/" + this.country).subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                var data = result.data;
                if (data.length != 0) {
                    var competitions_1 = [];
                    data.forEach(function (i) {
                        var competition = new Competitions_1.Competition(i._id, i.country, i.description, i.logo, i.name, i.sport);
                        competitions_1.push(competition);
                    });
                    setTimeout(function () {
                        _this.competitions = competitions_1;
                    }, 100);
                }
            }
            else {
                Materialize.toast("Unable to load competitions at this time", 2000);
            }
        }, function (error) {
            Materialize.toast("Unable to load competitions at this time", 2000);
        });
    };
    TeamsEdit.prototype.edit = function (event) {
        var _this = this;
        var body = {
            name: this.name,
            stadion: this.stadion,
            street: this.street,
            number: this.number,
            city: this.city,
            postal: this.postal,
            country: this.country,
            price: this.price,
            competition: this.competition,
        };
        if (this.logo) {
            body.logo = this.logo;
        }
        else {
            body.logo = this.logoUrl;
        }
        if (this.background) {
            body.background = this.background;
        }
        else {
            body.background = this.backgroundUrl;
        }
        this.apiService.putWithFiles("api/teams/" + this.id, body, function (data) {
            if (data) {
                _this.router.navigate(['admin/teams']);
            }
            else {
                Materialize.toast("Unable to edit this team at this time", 2000);
            }
        });
    };
    TeamsEdit.prototype.selectLogo = function (event) {
        var input = event.target;
        if (input && input.files[0]) {
            this.logo = input.files[0];
        }
    };
    TeamsEdit.prototype.selectBackground = function (event) {
        var input = event.target;
        if (input && input.files[0]) {
            this.background = input.files[0];
        }
    };
    return TeamsEdit;
}());
TeamsEdit = __decorate([
    core_1.Component({
        selector: 'teams-edit',
        templateUrl: './app/components/admin/teams/edit/edit.view.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, ApiService_1.ApiService])
], TeamsEdit);
exports.TeamsEdit = TeamsEdit;
//# sourceMappingURL=Edit.js.map