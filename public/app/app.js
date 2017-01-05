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
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var angular2_jwt_1 = require("angular2-jwt");
var Auth_1 = require("./services/Auth");
var AuthGuard_1 = require("./common/AuthGuard");
var AdminGuard_1 = require("./common/AdminGuard");
var ApiService_1 = require("./services/ApiService");
var UploadService_1 = require("./services/UploadService");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var App_1 = require("./components/App");
var Register_1 = require("./components/auth/register/Register");
var Login_1 = require("./components/auth/login/Login");
var Landing_1 = require("./components/index/Landing");
var Footer_1 = require("./components/common/footer/Footer");
var Header_1 = require("./components/common/header/Header");
var Topwedstrijd_1 = require("./components/index/Topwedstrijden/Topwedstrijd");
var Weekwedstrijd_1 = require("./components/index/Weekwedstrijden/Weekwedstrijd");
var Search_1 = require("./components/search/Search");
var Evenement_1 = require("./components/evenement/Evenement");
var Listing_1 = require("./components/listing/Listing");
var Cart_1 = require("./components/cart/Cart");
var Offer_1 = require("./components/offer/Offer");
var Profile_1 = require("./components/profile/Profile");
var Overview_1 = require("./components/admin/overview/Overview");
var Sports_1 = require("./components/admin/sports/list/Sports");
var Create_1 = require("./components/admin/sports/create/Create");
var Edit_1 = require("./components/admin/sports/edit/Edit");
var Countries_1 = require("./components/admin/countries/list/Countries");
var Create_2 = require("./components/admin/countries/create/Create");
var Edit_2 = require("./components/admin/countries/edit/Edit");
var Competitions_1 = require("./components/admin/competitions/list/Competitions");
var angular2_materialize_1 = require("angular2-materialize");
var Routes_1 = require("./modules/Routes");
var Subporter = (function () {
    function Subporter() {
    }
    return Subporter;
}());
Subporter = __decorate([
    core_1.NgModule({
        bootstrap: [App_1.App],
        declarations: [App_1.App, Register_1.Register, Login_1.Login, Landing_1.Landing, Footer_1.Footer, Header_1.Header, Topwedstrijd_1.Topwedstrijd, Weekwedstrijd_1.Weekwedstrijd, Search_1.Search, Evenement_1.Evenement, Listing_1.Listing, Cart_1.Cart, Overview_1.AdminOverview, Sports_1.AdminSports, Create_1.SportsCreate, Edit_1.SportsEdit, Offer_1.Offer, Countries_1.AdminCountries, Profile_1.Profile, Create_2.CountriesCreate, Edit_2.CountriesEdit, Competitions_1.AdminCompetitions, angular2_materialize_1.MaterializeDirective],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            Routes_1.Routing
        ],
        providers: [
            Auth_1.Auth,
            AuthGuard_1.AuthGuard,
            AdminGuard_1.AdminGuard,
            angular2_jwt_1.AUTH_PROVIDERS,
            ApiService_1.ApiService,
            cookies_service_1.CookieService,
            UploadService_1.UploadService
        ]
    }),
    __metadata("design:paramtypes", [])
], Subporter);
exports.Subporter = Subporter;
//# sourceMappingURL=app.js.map