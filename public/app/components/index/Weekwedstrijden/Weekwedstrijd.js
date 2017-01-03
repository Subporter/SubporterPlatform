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
var Weekwedstrijd = (function () {
    function Weekwedstrijd() {
    }
    return Weekwedstrijd;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Weekwedstrijd.prototype, "home", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Weekwedstrijd.prototype, "away", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Weekwedstrijd.prototype, "date", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Weekwedstrijd.prototype, "amount", void 0);
__decorate([
    input(),
    __metadata("design:type", String)
], Weekwedstrijd.prototype, "location", void 0);
Weekwedstrijd = __decorate([
    core_1.Component({
        selector: 'weekwedstrijd',
        template: "\n\t \n      <span class=\"title\">{{home}} - {{away}}</span>\n      <p>{{date}}<br>\n         {{location}}\n      </p>\n      <div class=\"secondary-content\">\n      <i class=\"fa fa-ticket fa-2x \" aria-hidden=\"true\"></i>\n      <span>{{amount}}</span>\n      </div>\n\t \n\t ",
        styleUrls: ['../../css/css/landing.css']
    }),
    __metadata("design:paramtypes", [])
], Weekwedstrijd);
exports.Weekwedstrijd = Weekwedstrijd;
//# sourceMappingURL=Weekwedstrijd.js.map