import { Injectable } from '@angular/core';
import { Observable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from '../services/Auth';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private auth: Auth, private router: Router) { }

    canActivate() {
        if (this.auth.isLoggedIn()) {
            this.auth.isAdmin().then(function(res) {
                if (res) {
                    return true;
                } else {
                    this.router.navigate(['/landing']);
                    return false;
                }
            });
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}