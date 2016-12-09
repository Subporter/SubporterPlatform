import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../common/headers'

@Component({
	selector: 'home',
	template: `
		<div>
			<div class="home jumbotron centered">
				<h1>Welcome to Angular2 through Auth</h1>
				<h2 *ngIf="jwt">Your JWT is:</h2>
				<pre *ngIf="jwt" class="jwt"><code>{{ jwt }}</code></pre>
				<p>Click any of the buttons to call an API and get a response</p>
				<p><a class="btn btn-primary btn-lg" role="button" (click)="callAnonymousApi()">Call Anonymous API</a></p>
    			<p><a class="btn btn-primary btn-lg" role="button" (click)="callSecuredApi()">Call Secure API</a></p>
    			<p><a class="btn btn-primary btn-lg" role="button" (click)="logout()">Logout</a></p>
    			<h2 *ngIf="response">The response of calling the <span class="red">{{ api }}</span> API is:</h2>
    			<h3 *ngIf="response">{{ response }}</h3>
			</div>
		</div>
	`
})

export class Home {
	jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();

	constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
	}

	useJwtHelper() {
		let token = localStorage.getItem("id_token");
		console.log("Token:", token);

		console.log(
			this.jwtHelper.decodeToken(token),
			this.jwtHelper.getTokenExpirationDate(token),
			this.jwtHelper.isTokenExpired(token)
		)
	}

	logout() {
		localStorage.removeItem("id_token");
		this.router.navigate(["login"]);
	}

	callAnonymousApi() {
		this._callApi("Anonymous", "http://localhost:1337/api/sports");
	}

	callSecuredApi() {
		this._callApi("Secured", "http://localhost:1337/api/user");
	}

	_callApi(type, url) {
		this.useJwtHelper();
		this.response = null;
		if (type === "Anonymous") {
			this.http.get(url)
				.subscribe(
				response => this.response = response.text(),
				error => this.response = error.text
				);
		}
		if (type === "Secured") {
			contentHeaders.append("Authorization", localStorage.getItem("id_token"));
			this.authHttp.get(url, {
				headers: contentHeaders
			})
				.subscribe(
				response => this.response = response.text(),
				error => this.response = error.text
				);
		}
	}

}