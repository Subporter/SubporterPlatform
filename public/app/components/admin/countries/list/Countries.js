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
var Countries_1 = require("../../../../modules/Countries");
var ApiService_1 = require("../../../../services/ApiService");
var AdminCountries = (function () {
    function AdminCountries(apiService) {
        this.apiService = apiService;
        this.countries = [];
    }
    AdminCountries.prototype.ngOnInit = function () {
        var _this = this;
        $('.modal').modal();
        this.apiService.get("api/countries").subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                var data = result.data;
                if (data.length !== 0) {
                    data.forEach(function (i) {
                        var country = new Countries_1.Country(i._id, i.name, i.featured);
                        _this.countries.push(country);
                    });
                }
            }
            else {
                materialize_css_1.Materialize.toast("Unable to load countries at this time", 2000);
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to load countries at this time", 2000);
        });
    };
    AdminCountries.prototype.delete = function (id) {
        this.selectedCountry = this.countries.filter(function (country) { return country._id === id; })[0];
    };
    AdminCountries.prototype.confirmDelete = function (id) {
        var _this = this;
        this.apiService.delete("api/countries/" + id).subscribe(function (response) {
            var result = JSON.parse(response.text());
            materialize_css_1.Materialize.toast(result.info, 2000);
            if (result.success) {
                _this.countries = _this.countries.filter(function (country) { return country._id !== id; });
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to delete country at this time", 2000);
        });
    };
    return AdminCountries;
}());
AdminCountries = __decorate([
    core_1.Component({
        selector: 'admin-countries',
        templateUrl: './app/components/admin/countries/list/countries.view.html'
    }),
    __metadata("design:paramtypes", [ApiService_1.ApiService])
], AdminCountries);
exports.AdminCountries = AdminCountries;
//# sourceMappingURL=Countries.js.map