import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../../common/headers'

@Component({
	selector: 'login',
	template: `
		<div>
			<h1>Login</h1>
			<form (submit)="login($event)">
				<div class="form-group">
     				<label for="email">Email</label>
     				<input [(ngModel)]="email" type="email" class="form-control" name="email" id="email" placeholder="Email">
   				</div>
   				<div class="form-group">
     				<label for="password">Password</label>
     				<input [(ngModel)]="password" type="password" class="form-control" name="password" id="password" placeholder="Password">
   				</div>
   				<button type="submit" class="btn btn-default">Submit</button>
     			<a [routerLink]="['/register']">Click here to register</a>
     			<a [routerLink]="['/home']">Click here to go home</a>
			</form>
		</div>
	`
})

export class Login {
	email: String;
	password: String;

	constructor(public router: Router, public http: Http) {
	}

	login() {
		event.preventDefault();
		let email = this.email,
			password = this.password;

		let body = JSON.stringify({
			email,
			password
		});

		this.http.post('/login', body, {
			headers: contentHeaders
		})
			.subscribe(
			response => {
				console.log(response.json());
				if (response.json().success = true) {
					localStorage.setItem("id_token", response.json().token);
					this.router.navigate(['home']);
				}
			},
			error => {
				alert(error.text());
				console.error(error.text());
			}
		)
	}

	register(event) {
		event.preventDefault();
		this.router.navigate(['register']);
	}
}