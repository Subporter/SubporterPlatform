import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Auth } from './services/Auth';
import { AuthGuard } from "./common/AuthGuard";
import { AdminGuard } from "./common/AdminGuard";
import { ApiService } from "./services/ApiService";

import { App } from "./components/App";
import { Home } from "./components/home/Home";
import { Register } from "./components/auth/register/Register";
import { Login } from "./components/auth/login/Login";
import { Landing } from "./components/index/Landing";

import { Routing } from "./modules/Routes";

import { MnFullpageDirective, MnFullpageService } from "ng2-fullpage/ng2-fullpage";

@NgModule({
	bootstrap: [ App ],
	declarations: [ App, Home, Register, Login, Landing,  MnFullpageDirective ],
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
		MnFullpageService
	]
})

export class Subporter {}