import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home } from "../components/home/Home";
import { Register } from "../components/auth/register/Register";
import { Login } from "../components/auth/login/Login";
//import { Landing } from "../components/index/Landing";
import { AuthGuard } from "../common/AuthGuard";
import { AdminGuard } from "../common/AdminGuard";

export const SubporterRoutes: Routes = [
	{
		path: '', component: Login
	},
	{
		path: 'login', component: Login
	},
	{
		path: 'register', component: Register
	},
	{
		path: 'home', component: Home, canActivate: [ AuthGuard ]
	},
	{
		path: '**', component: Login
	}
]

export const Routing: ModuleWithProviders = RouterModule.forRoot(SubporterRoutes);