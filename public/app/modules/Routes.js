"use strict";
var router_1 = require("@angular/router");
var Home_1 = require("../components/home/Home");
var Register_1 = require("../components/auth/register/Register");
var Login_1 = require("../components/auth/login/Login");
var Landing_1 = require("../components/index/Landing");
var Search_1 = require("../components/search/Search");
var Listing_1 = require("../components/listing/Listing");
var Evenement_1 = require("../components/evenement/Evenement");
var AuthGuard_1 = require("../common/AuthGuard");
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
        path: 'home', component: Home_1.Home, canActivate: [AuthGuard_1.AuthGuard]
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
        path: '**', component: Login_1.Login
    }
];
exports.Routing = router_1.RouterModule.forRoot(exports.SubporterRoutes);
//# sourceMappingURL=Routes.js.map