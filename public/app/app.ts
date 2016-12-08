import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AUTH_PROVIDERS } from "angular2-jwt";

import { AuthGuard } from "./common/AuthGuard";
import { App } from "./components/App";
import { Home } from "./components/home/Home";
import { Register } from "./components/auth/register/Register";
import { Login } from "./components/auth/login/Login";

import { Routing } from "./modules/Routes";

@NgModule({
	bootstrap: [ App ],
	declarations: [ App, Home, Register, Login ],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		Routing
	],
	providers: [
		AuthGuard, ...AUTH_PROVIDERS
	]
})

export class Subporter {}