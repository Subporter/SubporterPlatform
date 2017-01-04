import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from '../services/Auth';
import { ApiService } from '../services/ApiService';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private auth: Auth, private router: Router, private apiService: ApiService) { }

	canActivate() {
		if (this.auth.isLoggedIn()) {
			if (this.auth.isAdmin()) {
                return true;
            } else {
				this.router.navigate(['/login']);
                return false;
            }
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}