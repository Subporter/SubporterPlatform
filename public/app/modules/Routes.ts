import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../common/AuthGuard';
import { AdminGuard } from '../common/AdminGuard';

import { Login } from '../components/auth/login/Login';
import { Register } from '../components/auth/register/Register';
import { Landing } from '../components/index/Landing';
import { Search } from '../components/search/Search';
import { Listing } from '../components/listing/Listing';
import { Evenement } from '../components/evenement/Evenement';
import { Cart } from '../components/cart/Cart';
import { Offer } from '../components/offer/Offer';
import { Profile } from '../components/profile/Profile';
import { AdminOverview } from '../components/admin/overview/Overview';
import { AdminSports } from '../components/admin/sports/list/Sports';
import { SportsCreate } from '../components/admin/sports/create/Create';
import { SportsEdit } from '../components/admin/sports/edit/Edit';
import { AdminCountries } from '../components/admin/countries/list/Countries';
import { CountriesCreate } from '../components/admin/countries/create/Create';
import { CountriesEdit } from '../components/admin/countries/edit/Edit';
import { AdminCompetitions } from '../components/admin/competitions/list/Competitions';
import { CompetitionsCreate } from '../components/admin/competitions/create/Create';
import { CompetitionsEdit } from '../components/admin/competitions/edit/Edit';
import { AdminTeams } from '../components/admin/teams/list/Teams';
import { TeamsCreate } from '../components/admin/teams/create/Create';
import { TeamsEdit } from '../components/admin/teams/edit/Edit';

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
        path: 'landing', component: Landing
    },
    {
        path: 'search', component: Search
    },
    {
        path: 'cart', component: Cart
    },
    {
        path: 'offer', component: Offer
    },
    {
        path: 'profile', component: Profile
    },
    {
        path: 'login/:id', component: Login
    },
    {
        path: 'evenement/:id', component: Evenement
    },
    {
        path: 'listing/:id', component: Listing
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
        path: 'admin/countries', component: AdminCountries, canActivate: [AdminGuard]
    },
    {
        path: 'admin/countries/add', component: CountriesCreate, canActivate: [AdminGuard]
    },
    {
        path: 'admin/countries/edit/:id', component: CountriesEdit, canActivate: [AdminGuard]
    },
    {
        path: 'admin/competitions', component: AdminCompetitions, canActivate: [AdminGuard]
    },
	{
        path: 'admin/competitions/country/:country', component: AdminCompetitions, canActivate: [AdminGuard]
    },
	{
        path: 'admin/competitions/sport/:sport', component: AdminCompetitions, canActivate: [AdminGuard]
    },
	{
        path: 'admin/competitions/country/:country/sport/:sport', component: AdminCompetitions, canActivate: [AdminGuard]
    },
    {
        path: 'admin/competitions/add', component: CompetitionsCreate, canActivate: [AdminGuard]
    },
    {
        path: 'admin/competitions/edit/:id', component: CompetitionsEdit, canActivate: [AdminGuard]
    },
    {
        path: 'admin/teams', component: AdminTeams, canActivate: [AdminGuard]
    },
    {
        path: 'admin/teams/competition/:competition', component: AdminTeams, canActivate: [AdminGuard]
    },
    {
        path: 'admin/teams/add', component: TeamsCreate, canActivate: [AdminGuard]
    },
    {
        path: 'admin/teams/edit/:id', component: TeamsEdit, canActivate: [AdminGuard]
    },
    {
        path: '404', component: Login
    },
    {
        path: '**', redirectTo: '/404'
    }
]

export const Routing: ModuleWithProviders = RouterModule.forRoot(SubporterRoutes);