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
var materialize_css_1 = require("materialize-css");
var Sports_1 = require("../../../../modules/Sports");
var Countries_1 = require("../../../../modules/Countries");
var Competitions_1 = require("../../../../modules/Competitions");
var ApiService_1 = require("../../../../services/ApiService");
var AdminCompetitions = (function () {
    function AdminCompetitions(route, apiService) {
        this.route = route;
        this.apiService = apiService;
        this.sports = [];
        this.countries = [];
        this.competitionsList = [];
        this.competitions = [];
        this.modalActions = new core_1.EventEmitter();
    }
    AdminCompetitions.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.country = params["country"];
            _this.sport = params["sport"];
            _this.loadValues();
        });
    };
    AdminCompetitions.prototype.loadValues = function () {
        var _this = this;
        this.apiService.get("api/competitions").subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                var data = result.data;
                if (data.length !== 0) {
                    data.forEach(function (i) {
                        var competition = new Competitions_1.Competition(i._id, i.country, i.description, i.logo, i.name, i.sport);
                        _this.competitionsList.push(competition);
                    });
                    _this.filterValues();
                }
            }
            else {
                materialize_css_1.Materialize.toast("Unable to load competitions at this time", 2000);
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to load competitions at this time", 2000);
        });
        this.apiService.get("api/sports").subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                var data = result.data;
                if (data.length != 0) {
                    var sports_1 = [];
                    data.forEach(function (i) {
                        var sport = new Sports_1.Sport(i._id, i.name, i.featured);
                        sports_1.push(sport);
                    });
                    setTimeout(function () {
                        _this.sports = sports_1;
                    }, 100);
                }
            }
            else {
                materialize_css_1.Materialize.toast("Unable to load sports at this time", 2000);
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to load sports at this time", 2000);
        });
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
                materialize_css_1.Materialize.toast("Unable to load countries at this time", 2000);
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to load countries at this time", 2000);
        });
    };
    AdminCompetitions.prototype.filterValues = function () {
        var _this = this;
        if (this.sport && this.country) {
            this.competitions = this.competitionsList.filter(function (x) { return x.sport._id === _this.sport && x.country._id === _this.country; });
        }
        else if (this.sport) {
            this.competitions = this.competitionsList.filter(function (x) { return x.sport._id === _this.sport; });
        }
        else if (this.country) {
            this.competitions = this.competitionsList.filter(function (x) { return x.country._id === _this.country; });
        }
        else {
            this.competitions = this.competitionsList;
        }
    };
    AdminCompetitions.prototype.delete = function (id) {
        this.selectedCompetition = this.competitions.filter(function (country) { return country._id === id; })[0];
        this.modalActions.emit({ action: "modal", params: ['open'] });
    };
    AdminCompetitions.prototype.confirmDelete = function (id) {
        var _this = this;
        this.apiService.delete("api/competitions/" + id).subscribe(function (response) {
            var result = JSON.parse(response.text());
            materialize_css_1.Materialize.toast(result.info, 2000);
            if (result.success) {
                _this.competitions = _this.competitions.filter(function (competition) { return competition._id !== id; });
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to delete competition at this time", 2000);
        });
        this.modalActions.emit({ action: "modal", params: ['close'] });
    };
    AdminCompetitions.prototype.closeModal = function () {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    };
    AdminCompetitions.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return AdminCompetitions;
}());
AdminCompetitions = __decorate([
    core_1.Component({
        selector: 'admin-competitions',
        templateUrl: './app/components/admin/competitions/list/competitions.view.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, ApiService_1.ApiService])
], AdminCompetitions);
exports.AdminCompetitions = AdminCompetitions;
//# sourceMappingURL=Competitions.js.map