"use strict";
var router_1 = require("@angular/router");
var Register_1 = require("../components/auth/register/Register");
var Login_1 = require("../components/auth/login/Login");
var Landing_1 = require("../components/index/Landing");
var Search_1 = require("../components/search/Search");
var Listing_1 = require("../components/listing/Listing");
var Evenement_1 = require("../components/evenement/Evenement");
var Cart_1 = require("../components/cart/Cart");
var Offer_1 = require("../components/offer/Offer");
var Overview_1 = require("../components/admin/overview/Overview");
var Sports_1 = require("../components/admin/sports/list/Sports");
var Create_1 = require("../components/admin/sports/create/Create");
var Edit_1 = require("../components/admin/sports/edit/Edit");
var Profile_1 = require("../components/profile/Profile");
var Countries_1 = require("../components/admin/countries/list/Countries");
var Create_2 = require("../components/admin/countries/create/Create");
var Edit_2 = require("../components/admin/countries/edit/Edit");
var AdminGuard_1 = require("../common/AdminGuard");
exports.SubporterRoutes = [
    {
        path: '', component: Landing_1.Landing
    },
    {
        path: 'landing', component: Landing_1.Landing
    },
    {
        path: 'login', component: Login_1.Login
    },
    {
        path: 'login/:id', component: Login_1.Login
    },
    {
        path: 'register', component: Register_1.Register
    },
    {
        path: 'search', component: Search_1.Search
    },
    {
        path: 'evenement/:id', component: Evenement_1.Evenement
    },
    {
        path: 'listing/:id', component: Listing_1.Listing
    },
    {
        path: 'cart', component: Cart_1.Cart
    },
    {
        path: 'offer', component: Offer_1.Offer
    },
    {
        path: 'admin', component: Overview_1.AdminOverview, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'admin/sports', component: Sports_1.AdminSports, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'admin/sports/add', component: Create_1.SportsCreate, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'admin/sports/edit/:id', component: Edit_1.SportsEdit, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'profile', component: Profile_1.Profile
    },
    {
        path: 'admin/countries', component: Countries_1.AdminCountries, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'admin/countries/add', component: Create_2.CountriesCreate, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'admin/countries/edit/:id', component: Edit_2.CountriesEdit, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: '**', component: Login_1.Login
    }
];
exports.Routing = router_1.RouterModule.forRoot(exports.SubporterRoutes);
//# sourceMappingURL=Routes.js.map