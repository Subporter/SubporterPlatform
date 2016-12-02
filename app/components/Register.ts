import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
	selector: 'register',
	template: ``
})

export class Register {
	constructor(public router: Router, public http: Http) {
	}

	register(event, username, password) {
		event.preventDefault();
	}

	login(event) {
		event.preventDefault();
		this.router.navigate(['login']);
	}
}