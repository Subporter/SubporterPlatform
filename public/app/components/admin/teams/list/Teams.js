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
var Competitions_1 = require("../../../../modules/Competitions");
var Teams_1 = require("../../../../modules/Teams");
var ApiService_1 = require("../../../../services/ApiService");
var AdminTeams = (function () {
    function AdminTeams(route, apiService) {
        this.route = route;
        this.apiService = apiService;
        this.competitions = [];
        this.teamsList = [];
        this.teams = [];
        this.modalActions = new core_1.EventEmitter();
    }
    AdminTeams.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.competition = params["competition"];
            _this.loadValues();
        });
    };
    AdminTeams.prototype.loadValues = function () {
        var _this = this;
        this.apiService.get("api/teams").subscribe(function (response) {
            var result = JSON.parse(response.text());
            if (result.success) {
                var data = result.data;
                if (data.length !== 0) {
                    data.forEach(function (i) {
                        var team = new Teams_1.Team(i._id, i.background, i.competition, i.logo, i.name, i.price, i.stadion);
                        _this.teamsList.push(team);
                    });
                    _this.filterValues();
                }
            }
            else {
                materialize_css_1.Materialize.toast("Unable to load teams at this time", 2000);
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to load teams at this time", 2000);
        });
        this.apiService.get("api/competitions").subscribe(function (response) {
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
                materialize_css_1.Materialize.toast("Unable to load competitions at this time", 2000);
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to load competitions at this time", 2000);
        });
    };
    AdminTeams.prototype.filterValues = function () {
        var _this = this;
        if (this.competition) {
            this.teams = this.teamsList.filter(function (x) { return x.competition._id === _this.competition; });
        }
        else {
            this.teams = this.teamsList;
        }
    };
    AdminTeams.prototype.delete = function (id) {
        this.selectedTeam = this.teams.filter(function (x) { return x._id === id; })[0];
        this.modalActions.emit({ action: "modal", params: ['open'] });
    };
    AdminTeams.prototype.confirmDelete = function (id) {
        var _this = this;
        this.apiService.delete("api/teams/" + id).subscribe(function (response) {
            var result = JSON.parse(response.text());
            materialize_css_1.Materialize.toast(result.info, 2000);
            if (result.success) {
                _this.teams = _this.teams.filter(function (x) { return x._id !== id; });
            }
        }, function (error) {
            materialize_css_1.Materialize.toast("Unable to delete team at this time", 2000);
        });
        this.modalActions.emit({ action: "modal", params: ['close'] });
    };
    AdminTeams.prototype.closeModal = function () {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    };
    AdminTeams.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return AdminTeams;
}());
AdminTeams = __decorate([
    core_1.Component({
        selector: 'admin-teams',
        templateUrl: './app/components/admin/teams/list/teams.view.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, ApiService_1.ApiService])
], AdminTeams);
exports.AdminTeams = AdminTeams;
//# sourceMappingURL=Teams.js.map