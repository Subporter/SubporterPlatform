import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Auth } from '../../../services/Auth';
import { ApiService } from '../../../services/ApiService';

@Component({
    selector: 'subporter-header',
    template: `
    <header class="header" [ngStyle]="{ 'background-image':  'url('+image+')' }">
    	<nav>
    		<div class="nav-wrapper">
    			<a [routerLink]="['/']" class="brand-logo">Subporter</a>
    			<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
    			<ul id="nav-mobile" class="right hide-on-med-and-down">
    				<li> <a [routerLink]="['/search']">Zoeken</a></li>
    				<li *ngIf="isAdmin"><a [routerLink]="['/admin']">Admin</a></li>
    				<li *ngIf="isLoggedIn"><a [routerLink]="['/cart']">Winkelwagen</a></li>
    				<li *ngIf="!isLoggedIn"><a [routerLink]="['/login']">Login</a></li>
    				<li *ngIf="isLoggedIn"><a [routerLink]="['/profile']">Profiel</a></li>
    				<li *ngIf="isLoggedIn"><a (click)="logout()">Logout</a></li>
    				<li><a class="waves-effect waves-light btn" [routerLink]="['/offer']">Abonnement aanbieden</a></li>
    			</ul>
    			<ul class="side-nav" id="mobile-demo">
    				<li><a href="sass.html">Sass</a></li>
    				<li><a href="badges.html">Components</a></li>
    				<li><a href="collapsible.html">JavaScript</a></li>
    			</ul>
    		</div>
    	</nav>
    	<div class="container">
    		<h1>{{title}}</h1>
    		<h2>{{subtitle}}</h2>
    	</div>
    </header>
	`,
    styles: ['.header .container{ text-align: center;} .header .container h1{color: #fff;font-weight: 600; font-size:3em;} .header .container h2{color:#fff;font-size:2em;} .header{background-size: cover; height: 300px;}nav{background: none; -webkit-box-shadow: none; -moz-box-shadow: none;	box-shadow: none;}.brand-logo{margin-left: 10px;}']
})

export class Header {
    @Input() title: String;
    @Input() subtitle: String;
    @Input() image: String;
    isAdmin: Boolean = false;
    isLoggedIn: Boolean = false;

    constructor(public router: Router, public auth: Auth, public apiService: ApiService) { }

    ngOnInit() {
        this.isLoggedIn = this.auth.isLoggedIn();
        this.apiService.get('check/admin').subscribe(
            response => {
                let result = JSON.parse(response.text()).success;
                this.isAdmin = result;
            },
            error => {
                this.isAdmin = false;
            }
        );
    }

    logout() {
        localStorage.removeItem('id_token');
        this.router.navigate(['/landing']);
    }
}