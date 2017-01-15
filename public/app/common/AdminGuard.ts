import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Auth } from '../services/Auth';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private auth: Auth, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.auth.isLoggedIn()) {
			return this.auth.isAdmin().map(success => {
				if (success) {
					return true;
				} else {
					this.router.navigate(['/landing']);
					return false;
				}
			}).catch(() => {
				this.router.navigate(['/landing']);
				return Observable.of(false);
			});
		} else {
			this.router.navigate(['/login']);
			return Observable.of(false);
		}
    }
}