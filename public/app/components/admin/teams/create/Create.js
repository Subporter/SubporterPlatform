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
var TeamsCreate = (function () {
    function TeamsCreate(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.countries = [];
        this.competitions = [];
    }
    TeamsCreate.prototype.ngOnInit = function () {
        this.loadValues();
    };
    TeamsCreate.prototype.loadValues = function () {
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
    TeamsCreate.prototype.loadCompetitions = function () {
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
    TeamsCreate.prototype.create = function (event) {
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
            logo: this.logo,
            background: this.background
        };
        this.apiService.postWithFiles("api/teams", body, function (data) {
            if (data) {
                _this.router.navigate(['admin/teams']);
            }
            else {
                Materialize.toast("Unable to add a team at this time", 2000);
            }
        });
    };
    TeamsCreate.prototype.selectLogo = function (event) {
        var input = event.target;
        if (input && input.files[0]) {
            this.logo = input.files[0];
        }
    };
    TeamsCreate.prototype.selectBackground = function (event) {
        var input = event.target;
        if (input && input.files[0]) {
            this.background = input.files[0];
        }
    };
    return TeamsCreate;
}());
TeamsCreate = __decorate([
    core_1.Component({
        selector: 'teams-create',
        templateUrl: './app/components/admin/teams/create/create.view.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, ApiService_1.ApiService])
], TeamsCreate);
exports.TeamsCreate = TeamsCreate;
//# sourceMappingURL=Create.js.map