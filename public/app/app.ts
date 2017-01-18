import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';
import { MaterializeDirective } from 'angular2-materialize';

import { App } from './components/App';
import { Footer } from './components/common/footer/Footer';
import { Header } from './components/common/header/Header';
import { HeaderAdmin } from "./components/admin/header/Header";
import { Register } from './components/auth/register/Register';
import { Login } from './components/auth/login/Login';
import { Landing } from './components/index/Landing';
import { Search } from './components/search/Search';
import { Evenement } from './components/evenement/Evenement';
import { Listing } from './components/listing/Listing';
import { Cart } from './components/cart/Cart';
import { Offer } from './components/offer/Offer';
import { Profile } from './components/profile/Profile';
import { AdminOverview } from './components/admin/overview/Overview';
import { AdminSports } from './components/admin/sports/list/Sports';
import { SportsCreate } from './components/admin/sports/create/Create';
import { SportsEdit } from './components/admin/sports/edit/Edit';
import { AdminCountries } from './components/admin/countries/list/Countries';
import { CountriesCreate } from './components/admin/countries/create/Create';
import { CountriesEdit } from './components/admin/countries/edit/Edit';
import { AdminCompetitions } from './components/admin/competitions/list/Competitions';
import { CompetitionsCreate } from './components/admin/competitions/create/Create';
import { CompetitionsEdit } from './components/admin/competitions/edit/Edit';
import { AdminTeams } from './components/admin/teams/list/Teams';
import { TeamsCreate } from './components/admin/teams/create/Create';
import { TeamsEdit } from './components/admin/teams/edit/Edit';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Auth } from './services/Auth';
import { AuthGuard } from './common/AuthGuard';
import { AdminGuard } from './common/AdminGuard';
import { ApiService } from './services/ApiService';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Routing } from './modules/Routes';

@NgModule({
    bootstrap: [
        App
    ],
    declarations: [
        App,
        Footer,
        Header,
        HeaderAdmin,
        Register,
        Login,
        Landing,
        Search,
        Offer,
        Profile,
        Evenement,
        Listing,
        Cart,
        AdminOverview,
        AdminSports,
        SportsCreate,
        SportsEdit,
        AdminCountries,
        CountriesCreate,
        CountriesEdit,
        AdminCompetitions,
        CompetitionsCreate,
        CompetitionsEdit,
        AdminTeams,
        TeamsCreate,
        TeamsEdit,
        MaterializeDirective
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        Routing,
        SimpleNotificationsModule,
        PushNotificationsModule
    ],
    providers: [
        Auth,
        AuthGuard,
        AdminGuard,
        AUTH_PROVIDERS,
        ApiService,
        CookieService
    ]
})

export class Subporter { }