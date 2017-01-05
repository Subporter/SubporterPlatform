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
var materialize_css_1 = require("materialize-css");
var $ = require("jquery");
var Competitions_1 = require("../../../../modules/Competitions");
var ApiService_1 = require("../../../../services/ApiService");
var AdminCompetitions = (function () {
    function AdminCompetitions(apiService) {
        this.apiService = apiService;
        this.competitions = [];
    }
    AdminCompetitions.prototype.ngOnInit = function () {
        var _this = this;
        $('.modal').modal();
        this.apiService.get("api/competitions").subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                var data = result.data;
                if (data.length !== 0) {
                    data.forEach(function (i) {
                        var competition = new Competitions_1.Competition(i._id, i.country, i.description, i.logo, i.name, i.sport);
                        _this.competitions.push(competition);
                    });
                    console.log(_this.competitions);
                }
            }
            else {
                materialize_css_1.Materialize.toast("Unable to load competitions at this time", 2000);
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to load competitions at this time", 2000);
        });
    };
    AdminCompetitions.prototype.delete = function (id) {
        this.selectedCompetition = this.competitions.filter(function (country) { return country._id === id; })[0];
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
    };
    return AdminCompetitions;
}());
AdminCompetitions = __decorate([
    core_1.Component({
        selector: 'admin-competitions',
        templateUrl: './app/components/admin/competitions/list/competitions.view.html'
    }),
    __metadata("design:paramtypes", [ApiService_1.ApiService])
], AdminCompetitions);
exports.AdminCompetitions = AdminCompetitions;
//# sourceMappingURL=Competitions.js.map