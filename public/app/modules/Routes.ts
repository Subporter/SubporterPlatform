import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home } from "../components/home/Home";
import { Register } from "../components/auth/register/Register";
import { Login } from "../components/auth/login/Login";
import { Landing } from "../components/index/Landing";
import { Search } from "../components/search/Search";
import { Listing } from "../components/listing/Listing";
import { Evenement } from "../components/evenement/Evenement";
import { AuthGuard } from "../common/AuthGuard";
import { AdminGuard } from "../common/AdminGuard";

export const SubporterRoutes: Routes = [
	{
		path: '', component: Landing
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
		path: 'search', component: Search
	},
	{
		path: 'evenement/:id', component: Evenement
	},
	{
		path: 'listing/:id', component: Listing
	},
	{
		path: '**', component: Login
	}
]

export const Routing: ModuleWithProviders = RouterModule.forRoot(SubporterRoutes);