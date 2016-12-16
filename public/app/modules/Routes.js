"use strict";
var router_1 = require("@angular/router");
var Home_1 = require("../components/home/Home");
var Register_1 = require("../components/auth/register/Register");
var Login_1 = require("../components/auth/login/Login");
var AdminGuard_1 = require("../common/AdminGuard");
exports.SubporterRoutes = [
    {
        path: '', component: Login_1.Login
    },
    {
        path: 'login', component: Login_1.Login
    },
    {
        path: 'register', component: Register_1.Register
    },
    {
        path: 'home', component: Home_1.Home, canActivate: [AdminGuard_1.AdminGuard]
    },
    {
        path: '**', component: Login_1.Login
    }
];
exports.Routing = router_1.RouterModule.forRoot(exports.SubporterRoutes);
//# sourceMappingURL=Routes.js.map