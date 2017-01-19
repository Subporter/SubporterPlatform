import { Component, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ApiService } from '../../services/ApiService';
import { Subscription } from 'rxjs';
import 'materialize-css';
import 'angular2-materialize';
import { Location } from '@angular/common';
import { CookieService } from 'angular2-cookie/core';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';

@Component({
    selector: 'cart',
    templateUrl: './app/components/cart/cart.view.html',
    styleUrls: ['../../css/cart.css']
})

export class Cart {
    modalActions = new EventEmitter<string | MaterializeAction>();
    modalActions2 = new EventEmitter<string | MaterializeAction>();
    modalActions3 = new EventEmitter<string | MaterializeAction>();
    params = []
    response: String;
    api: String;
    loan: JSON;
    home: String;
    away: String;
    date: String;
    stadion: String;
    banner: String;
    profile: JSON;
    avatar: String;
    name: String;
    firstname: String;
    city: String;
    prices: number = 0;
    price: number = 0;
    id: number;
    cookie: any;
    loans: JSON = [];
    counter: number = 0;
    show = true;

    private loggedIn = false;
    private subscription: Subscription;
    private isAdmin = false;

    constructor(public router: Router, public http: Http, public apiService: ApiService, private activatedRoute: ActivatedRoute, private _location: Location, private _cookieService: CookieService) {
        this.loggedIn = !!localStorage.getItem('id_token');
    }

    ngOnInit() {
        if (!this.loggedIn) {
            this.router.navigateByUrl('/');
        }

        this.apiService.get('check/admin').subscribe(
            response => {
                let result = JSON.parse(response.text()).success;
                this.isAdmin = result;
            },
            error => {
                this.isAdmin = false;
            }
        );

        let x = this._cookieService.getAll();
        this.cookie = x;

        if (this.isEmpty(x)) {
            this.show = false;
            this.showEmpty();
        } else {
            this.showCart();
        }
    }

    logout() {
        localStorage.removeItem('id_token');
        this.router.navigate(['/landing']);
    }

    showCart() {
        let cookie = this.cookie;

        for (var cook in cookie) {
            this._callApi("Anonymous", "api/loans/" + cook);
        }
    }

    showEmpty() {

    }

    _callApi(type, url) {
        this.apiService.get(url).subscribe(
            response => this.getLoan(response.text()),
            error => this.response = error.text
        );
    }

    getLoan(data) {
        let Data = data;
        let jsonData = JSON.parse(Data);
        this.loan = jsonData.data;
        this.loans[this.counter] = this.loan;
        this.price += (this.loan.game.home.price * 0.1);
        this.prices += (this.loan.game.home.price);
        this.counter++;
    }

    back() {
        this._location.back();
    }

    removeCookie(cookie: number) {
        this._cookieService.remove(cookie);
        location.reload();
    }

    isEmpty(obj) {
        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }

    pay() {
        for (let loan of this.loans) {
            this._cookieService.remove(loan._id);
            this.apiService.put("api/loans/lend/" + loan._id, null).subscribe(
                response => this.paySuccess(response, loan),
                error => this.response = error.text
            );
        }

        this.modalActions2.emit({ action: "modal", params: ['open'] });
    }

    paySuccess(response, loan) {
        console.log(response.text());
    }

    openModal() {
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }

    closeModal() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }
}