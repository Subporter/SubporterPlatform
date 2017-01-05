import { tokenNotExpired } from "angular2-jwt";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from "./ApiService";

@Injectable()
export class Auth {
    constructor(public apiService: ApiService) { }

    isLoggedIn() {
        return tokenNotExpired();
    }

    isAdmin() : Observable<boolean> {
        if (this.isLoggedIn()) {
            return this.apiService.get("check/admin").map(
                response => {
                    return Observable.of(JSON.parse(response.text()).success)
                }
            ).catch(
                error => {
                    return Observable.of(false)
                }
            )
        } else {
            return Observable.of(false)
        }
    }
}