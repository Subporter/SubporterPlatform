import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AUTH_PROVIDERS } from "angular2-jwt";

import { AuthGuard } from "./common/AuthGuard";
import { App } from "./components/App";
import { Home } from "./components/home/Home";
import { Register } from "./components/auth/register/Register";
import { Login } from "./components/auth/login/Login";

import { SubporterRoutes } from "./modules/Routes";

@NgModule({
	bootstrap: [ App, Home, Register, Login ],
	declarations: [ App, Home, Register, Login ],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		RouterModule.forRoot(SubporterRoutes, { useHash: true })
	],
	providers: [
		AuthGuard, ...AUTH_PROVIDERS
	]
})

export class Subporter {}