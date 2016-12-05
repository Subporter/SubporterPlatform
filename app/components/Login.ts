import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
	selector: 'login',
	template: `

	`
})

export class Login {
	constructor(public router: Router, public http: Http) {
	}

	login(event, username, password) {
		event.preventDefault();
	}

	register(event) {
		event.preventDefault();
		this.router.navigate(['register']);
	}
}