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
var ApiService_1 = require("../../../../services/ApiService");
var CountriesEdit = (function () {
    function CountriesEdit(router, route, apiService) {
        this.router = router;
        this.route = route;
        this.apiService = apiService;
        this.name = "";
    }
    CountriesEdit.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params["id"];
            _this.apiService.get("api/countries/" + _this.id).subscribe(function (response) {
                var result = JSON.parse(response.text());
                if (result.success) {
                    _this.name = result.data.name;
                }
                else {
                    _this.router.navigate(['admin/countries']);
                }
            }, function (error) {
                _this.router.navigate(['admin/countries']);
            });
        });
    };
    CountriesEdit.prototype.edit = function (event) {
        var _this = this;
        var name = this.name;
        var body = JSON.stringify({
            name: name
        });
        this.apiService.put("api/countries/" + this.id, body).subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                _this.router.navigate(['admin/countries']);
            }
            else {
                materialize_css_1.Materialize.toast("Unable to edit countries at this time", 2000);
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to edit countries at this time", 2000);
        });
    };
    return CountriesEdit;
}());
CountriesEdit = __decorate([
    core_1.Component({
        selector: 'countries-edit',
        templateUrl: './app/components/admin/countries/edit/edit.view.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, ApiService_1.ApiService])
], CountriesEdit);
exports.CountriesEdit = CountriesEdit;
//# sourceMappingURL=Edit.js.map