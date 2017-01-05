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
import { AdminSports } from "../components/admin/sports/list/Sports";
import { SportsCreate } from "../components/admin/sports/create/Create";
import { SportsEdit } from "../components/admin/sports/edit/Edit";
import { Profile } from "../components/profile/Profile";
import { AdminCountries } from "../components/admin/countries/list/Countries";
import { CountriesCreate } from "../components/admin/countries/create/Create";
import { CountriesEdit } from "../components/admin/countries/edit/Edit";
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
        path: 'admin', component: AdminOverview, canActivate: [AdminGuard]
    },
	{
		path: 'admin/sports', component: AdminSports, canActivate: [AdminGuard]
	},
	{
		path: 'admin/sports/add', component: SportsCreate, canActivate: [AdminGuard]
	},
    {
		path: 'admin/sports/edit/:id', component: SportsEdit, canActivate: [AdminGuard]
	},
    {
<<<<<<< HEAD
		path: 'profile', component: Profile
	},
=======
        path: 'admin/countries', component: AdminCountries, canActivate: [AdminGuard]
    },
    {
        path: 'admin/countries/add', component: CountriesCreate, canActivate: [AdminGuard]
    },
    {
        path: 'admin/countries/edit/:id', component: CountriesEdit, canActivate: [AdminGuard]
    },
>>>>>>> refs/remotes/origin/Niels
    {
        path: '**', component: Login
    }
]

export const Routing: ModuleWithProviders = RouterModule.forRoot(SubporterRoutes);