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
var Topwedstrijd = (function () {
    function Topwedstrijd() {
    }
    return Topwedstrijd;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Topwedstrijd.prototype, "home", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Topwedstrijd.prototype, "away", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Topwedstrijd.prototype, "date", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Topwedstrijd.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Topwedstrijd.prototype, "gameImage", void 0);
Topwedstrijd = __decorate([
    core_1.Component({
        selector: 'topwedstrijd',
        template: "\n\t \n            <div class=\"card-image\">\n              <img src=\"{{gameImage}}\">\n            </div>\n            <div class=\"card-content\">\n            <h6>{{home}} - {{away}}</h6>\n              <p>{{date}}</p>\n            </div>\n            <div class=\"card-action\">\n                <a href=\"{{id}}\">Zoek abonnementen</a>\n            </div>\n\t \n\t ",
        styleUrls: ['../../css/css/landing.css']
    }),
    __metadata("design:paramtypes", [])
], Topwedstrijd);
exports.Topwedstrijd = Topwedstrijd;
//# sourceMappingURL=Topwedstrijd.js.map