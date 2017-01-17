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
var SportsCreate = (function () {
    function SportsCreate(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.name = "";
        this.featured = false;
    }
    SportsCreate.prototype.create = function (event) {
        var _this = this;
        var name = this.name, featured = this.featured;
        var body = JSON.stringify({
            name: name,
            featured: featured
        });
        this.apiService.post("api/sports", body).subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                _this.router.navigate(['admin/sports']);
            }
            else {
                materialize_css_1.Materialize.toast("Unable to add a sport at this time", 2000);
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to add a sport at this time", 2000);
        });
    };
    return SportsCreate;
}());
SportsCreate = __decorate([
    core_1.Component({
        selector: 'sports-create',
        templateUrl: './app/components/admin/sports/create/create.view.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, ApiService_1.ApiService])
], SportsCreate);
exports.SportsCreate = SportsCreate;
//# sourceMappingURL=Create.js.map