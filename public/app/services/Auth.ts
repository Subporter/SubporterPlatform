import { tokenNotExpired } from "angular2-jwt";
import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';

@Injectable()
export class Auth {
	constructor(public apiService: ApiService) {

	}

	isLoggedIn() {
		return tokenNotExpired();
	}

	isAdmin() {
		this.apiService.call("check/admin").subscribe(
			response => {
				let success = JSON.parse(response.text()).success;
				return JSON.parse(response.text()).success;
			},
			error => {
				return false;
			}
		);
	}
}