"use strict";
var Home_1 = require("../components/Home");
var Register_1 = require("../components/Register");
var Login_1 = require("../components/Login");
var AuthGuard_1 = require("../common/AuthGuard");
exports.SubporterRoutes = [
    { path: '', component: Login_1.Login },
    { path: 'register', component: Register_1.Register },
    { path: 'login', component: Login_1.Login },
    { path: 'home', component: Home_1.Home, canActivate: [AuthGuard_1.AuthGuard] },
    { path: '**', component: Login_1.Login },
];
//# sourceMappingURL=Routes.js.map