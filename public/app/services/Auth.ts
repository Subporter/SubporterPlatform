import { tokenNotExpired } from "angular2-jwt";

export class Auth {
	isLoggedIn() {
		return tokenNotExpired();
	}

	isAdmin() {
		
	}
}