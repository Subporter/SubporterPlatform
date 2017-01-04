import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { ApiService } from '../../../services/ApiService';

@Component({
	selector: 'admin-overview',
	templateUrl: './app/components/admin/overview/overview.view.html'
})

export class AdminOverview {
	jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();

	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService) {
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

	updateUser() {
		let name = "Niels";

		let body = JSON.stringify({
			name
		});

		/*contentHeaders.append("Authorization", localStorage.getItem("id_token"));
		this.authHttp.put("http://localhost:1337/api/user", body, {
			headers: contentHeaders
		})
			.subscribe(
			response => this.response = response.text(),
			error => this.response = error.text
			);*/
	}

	callAnonymousApi() {
		this._callApi("Anonymous", "api/sports");
	}

	callSecuredApi() {
		this._callApi("Secured", "api/user");
	}

	_callApi(type, url) {
		this.apiService.get(url).subscribe(
			response => this.response = response.text(),
			error => this.response = error.text
		);
		/*this.useJwtHelper();
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
			this.http.get(url, {
				headers: contentHeaders
			})
				.subscribe(
				response => this.response = response.text(),
				error => this.response = error.text
				);
		}*/
	}

}