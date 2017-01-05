import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Register } from "../components/auth/register/Register";
import { Login } from "../components/auth/login/Login";
import { Landing } from "../components/index/Landing";
import { Search } from "../components/search/Search";
import { Listing } from "../components/listing/Listing";
import { Evenement } from "../components/evenement/Evenement";
import { Cart } from "../components/cart/Cart";
import { Offer } from "../components/offer/Offer";
import { AdminOverview } from "../components/admin/overview/Overview";

import { AuthGuard } from "../common/AuthGuard";
import { AdminGuard } from "../common/AdminGuard";

export const SubporterRoutes: Routes = [
    {
        path: '', component: Landing
    },
	{
		path: 'landing', component: Landing
	},
    {
        path: 'login', component: Login
    },
    {
        path: 'login/:id', component: Login
    },
    {
        path: 'register', component: Register
    },
    {
        path: 'admin/overview', component: AdminOverview, canActivate: [AdminGuard]
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
        path: 'cart', component: Cart
    },
    {
        path: 'offer', component: Offer
    },
    {
        path: '**', component: Login
    }
]

export const Routing: ModuleWithProviders = RouterModule.forRoot(SubporterRoutes);