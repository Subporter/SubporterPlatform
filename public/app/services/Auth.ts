import { tokenNotExpired } from "angular2-jwt";
import { Injectable } from '@angular/core';
import { ApiService } from "./ApiService";

@Injectable()
export class Auth {
	constructor(public apiService: ApiService) {

	}

	isLoggedIn() {
		return tokenNotExpired();
	}

	isAdmin() {
		let auth = this;
		return new Promise(function (resolve, reject) {
			auth.apiService.get("check/admin").subscribe(
				response => {
					resolve(JSON.parse(response.text()).success);
				},
				error => {
					resolve(false);
				}
			);
		});
	}
}