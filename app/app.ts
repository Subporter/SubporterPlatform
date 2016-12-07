import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AUTH_PROVIDERS } from 'angular2-jwt';

//import { AuthGuard } from './services/AuthService';
//import { Home } from './components/Home';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { App } from './components/App';

import { SubporterRoutes } from './modules/Routes';

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(SubporterRoutes, {useHash: true}) ],
  declarations: [ Register, Login, App ],
  bootstrap: [ App ],
  //providers: [ AuthGuard, ...AUTH_PROVIDERS ]
})

export class Subporter { }