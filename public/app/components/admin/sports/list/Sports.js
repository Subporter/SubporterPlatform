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
var Sports_1 = require("../../../../modules/Sports");
var ApiService_1 = require("../../../../services/ApiService");
var AdminSports = (function () {
    function AdminSports(apiService) {
        this.apiService = apiService;
        this.sports = [];
    }
    AdminSports.prototype.ngOnInit = function () {
        var _this = this;
        $('.modal').modal();
        this.apiService.get("api/sports").subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                var data = result.data;
                if (data.length !== 0) {
                    data.forEach(function (i) {
                        var sport = new Sports_1.Sport(i._id, i.name, i.featured);
                        _this.sports.push(sport);
                    });
                }
            }
            else {
                materialize_css_1.Materialize.toast("Unable to load sports at this time", 2000);
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to load sports at this time", 2000);
        });
    };
    AdminSports.prototype.delete = function (id) {
        this.selectedSport = this.sports.filter(function (sport) { return sport._id === id; })[0];
    };
    AdminSports.prototype.confirmDelete = function (id) {
        var _this = this;
        this.apiService.delete("api/sports/" + id).subscribe(function (response) {
            var result = JSON.parse(response.text());
            materialize_css_1.Materialize.toast(result.info, 2000);
            if (result.success) {
                _this.sports = _this.sports.filter(function (sport) { return sport._id !== id; });
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to delete sport at this time", 2000);
        });
    };
    return AdminSports;
}());
AdminSports = __decorate([
    core_1.Component({
        selector: 'admin-sports',
        templateUrl: './app/components/admin/sports/list/sports.view.html'
    }),
    __metadata("design:paramtypes", [ApiService_1.ApiService])
], AdminSports);
exports.AdminSports = AdminSports;
//# sourceMappingURL=Sports.js.map