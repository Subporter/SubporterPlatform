"use strict";
var router_1 = require("@angular/router");
var AdminGuard_1 = require("../common/AdminGuard");
var Login_1 = require("../components/auth/login/Login");
var Register_1 = require("../components/auth/register/Register");
var Landing_1 = require("../components/index/Landing");
var Search_1 = require("../components/search/Search");
var Listing_1 = require("../components/listing/Listing");
var Evenement_1 = require("../components/evenement/Evenement");
var Cart_1 = require("../components/cart/Cart");
var Offer_1 = require("../components/offer/Offer");
var Profile_1 = require("../components/profile/Profile");
var Overview_1 = require("../components/admin/overview/Overview");
var Sports_1 = require("../components/admin/sports/list/Sports");
var Create_1 = require("../components/admin/sports/create/Create");
var Edit_1 = require("../components/admin/sports/edit/Edit");
var Countries_1 = require("../components/admin/countries/list/Countries");
var Create_2 = require("../components/admin/countries/create/Create");
var Edit_2 = require("../components/admin/countries/edit/Edit");
var Competitions_1 = require("../components/admin/competitions/list/Competitions");
var Create_3 = require("../components/admin/competitions/create/Create");
var Edit_3 = require("../components/admin/competitions/edit/Edit");
exports.SubporterRoutes = [
    {
        path: '', component: Landing_1.Landing
    },
    {
        path: 'login', component: Login_1.Login
    },
    {
        path: 'register', component: Register_1.Register
    },
    {
        path: 'landing', component: Landing_1.Landing
    },
    {
        path: 'search', component: Search_1.Search
    },
    {
        path: 'cart', component: Cart_1.Cart
    },
    {
        path: 'offer', component: Offer_1.Offer
    },
    {
        path: 'profile', component: Profile_1.Profile
    },
    {
        path: 'login/:id', component: Login_1.Login
    },
    {
        path: 'evenement/:id', component: Evenement_1.Evenement
    },
    {
        path: 'listing/:id', component: Listing_1.Listing
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
        path: 'admin/countries', component: Countries_1.AdminCountries, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'admin/countries/add', component: Create_2.CountriesCreate, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'admin/countries/edit/:id', component: Edit_2.CountriesEdit, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'admin/competitions', component: Competitions_1.AdminCompetitions, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'admin/competitions/add', component: Create_3.CompetitionsCreate, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: 'admin/competitions/edit/:id', component: Edit_3.CompetitionsEdit, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: '404', component: Login_1.Login
    },
    {
        path: '**', redirectTo: '/404'
    }
];
exports.Routing = router_1.RouterModule.forRoot(exports.SubporterRoutes);
//# sourceMappingURL=Routes.js.map