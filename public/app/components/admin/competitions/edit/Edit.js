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
var ApiService_1 = require("../../../../services/ApiService");
var CompetitionsEdit = (function () {
    function CompetitionsEdit(router, route, apiService) {
        this.router = router;
        this.route = route;
        this.apiService = apiService;
        this.sports = [];
        this.countries = [];
    }
    CompetitionsEdit.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
            if (!_this.id) {
                _this.router.navigate(['admin/competitions']);
            }
        });
        this.loadCompetition();
        this.loadValues();
    };
    CompetitionsEdit.prototype.loadCompetition = function () {
        var _this = this;
        this.apiService.get("api/competitions/" + this.id).subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                _this.name = result.data.name;
                _this.description = result.data.description;
                _this.sport = result.data.sport._id;
                _this.country = result.data.country._id;
                _this.logoUrl = result.data.logo;
            }
            else {
                _this.router.navigate(['admin/competitions']);
            }
        }, function (error) {
            _this.router.navigate(['admin/competitions']);
        });
    };
    CompetitionsEdit.prototype.loadValues = function () {
        var _this = this;
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
    CompetitionsEdit.prototype.edit = function (event) {
        var _this = this;
        var body = {
            name: this.name,
            description: this.description,
            sport: this.sport,
            country: this.country
        };
        if (this.logo) {
            body.logo = this.logo;
        }
        else {
            body.logo = this.logoUrl;
        }
        this.apiService.putWithFiles("api/competitions/" + this.id, body, function (data) {
            if (data) {
                _this.router.navigate(['admin/competitions']);
            }
            else {
                materialize_css_1.Materialize.toast("Unable to edit this competition at this time", 2000);
            }
        });
    };
    CompetitionsEdit.prototype.selectFile = function (event) {
        var input = event.target;
        if (input && input.files[0]) {
            this.logo = input.files[0];
        }
    };
    return CompetitionsEdit;
}());
CompetitionsEdit = __decorate([
    core_1.Component({
        selector: 'competitions-edit',
        templateUrl: './app/components/admin/competitions/edit/edit.view.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, ApiService_1.ApiService])
], CompetitionsEdit);
exports.CompetitionsEdit = CompetitionsEdit;
//# sourceMappingURL=Edit.js.map