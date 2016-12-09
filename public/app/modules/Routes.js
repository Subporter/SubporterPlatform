"use strict";
var router_1 = require("@angular/router");
var Home_1 = require("../components/home/Home");
var Register_1 = require("../components/auth/register/Register");
var Login_1 = require("../components/auth/login/Login");
var AuthGuard_1 = require("../common/AuthGuard");
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
        path: 'home', component: Home_1.Home, canActivate: [AuthGuard_1.AuthGuard]
    }
];
exports.Routing = router_1.RouterModule.forRoot(exports.SubporterRoutes);
//# sourceMappingURL=Routes.js.map