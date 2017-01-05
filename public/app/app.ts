import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Auth } from './services/Auth';
import { AuthGuard } from "./common/AuthGuard";
import { AdminGuard } from "./common/AdminGuard";
import { ApiService } from "./services/ApiService";
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { App } from "./components/App";
import { Register } from "./components/auth/register/Register";
import { Login } from "./components/auth/login/Login";
import { Landing } from "./components/index/Landing";
import { Footer } from "./components/common/footer/Footer";
import { Header } from "./components/common/header/Header";
import { Topwedstrijd } from "./components/index/Topwedstrijden/Topwedstrijd";
import { Weekwedstrijd } from "./components/index/Weekwedstrijden/Weekwedstrijd";
import { Search } from "./components/search/Search";
import { Evenement } from "./components/evenement/Evenement";
import { Listing } from "./components/listing/Listing";
import { Cart } from "./components/cart/Cart";
import { AdminOverview } from "./components/admin/overview/Overview";
import { AdminSports } from "./components/admin/sports/list/Sports";
import { SportsCreate } from "./components/admin/sports/create/Create";
import { SportsEdit } from "./components/admin/sports/edit/Edit";
import { MaterializeDirective } from "angular2-materialize";

import { Routing } from "./modules/Routes";

@NgModule({
    bootstrap: [App],
    declarations: [App, Register, Login, Landing, Footer, Header, Topwedstrijd, Weekwedstrijd, Search, Evenement, Listing, Cart, AdminOverview, AdminSports, SportsCreate, SportsEdit, MaterializeDirective],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        Routing
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