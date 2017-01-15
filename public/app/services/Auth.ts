import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';

import { ApiService } from './ApiService';

@Injectable()
export class Auth {
    constructor(public apiService: ApiService) { }

    isLoggedIn() {
        return tokenNotExpired();
    }

    isAdmin() {
        return this.apiService.get('check/admin').map(response => JSON.parse(response.text()).success);
    }
}