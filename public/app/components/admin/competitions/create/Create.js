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
var Sports_1 = require("../../../../modules/Sports");
var Countries_1 = require("../../../../modules/Countries");
var ApiService_1 = require("../../../../services/ApiService");
var CompetitionsCreate = (function () {
    function CompetitionsCreate(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.sports = [];
        this.countries = [];
    }
    CompetitionsCreate.prototype.ngOnInit = function () {
        this.loadValues();
    };
    CompetitionsCreate.prototype.loadValues = function () {
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
                Materialize.toast("Unable to load sports at this time", 2000);
            }
        }, function (error) {
            Materialize.toast("Unable to load sports at this time", 2000);
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
                Materialize.toast("Unable to load countries at this time", 2000);
            }
        }, function (error) {
            Materialize.toast("Unable to load countries at this time", 2000);
        });
    };
    CompetitionsCreate.prototype.create = function (event) {
        var _this = this;
        var body = {
            name: this.name,
            description: this.description,
            sport: this.sport,
            country: this.country,
            logo: this.logo
        };
        this.apiService.postWithFiles("api/competitions", body, function (data) {
            if (data) {
                _this.router.navigate(['admin/competitions']);
            }
            else {
                Materialize.toast("Unable to add a competition at this time", 2000);
            }
        });
    };
    CompetitionsCreate.prototype.selectFile = function (event) {
        var input = event.target;
        if (input && input.files[0]) {
            this.logo = input.files[0];
        }
    };
    return CompetitionsCreate;
}());
CompetitionsCreate = __decorate([
    core_1.Component({
        selector: 'competitions-create',
        templateUrl: './app/components/admin/competitions/create/create.view.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, ApiService_1.ApiService])
], CompetitionsCreate);
exports.CompetitionsCreate = CompetitionsCreate;
//# sourceMappingURL=Create.js.map