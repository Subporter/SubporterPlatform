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
     				<label for="username">Username</label>
     				<input [(ngModel)]="username" type="text" class="form-control" id="username" placeholder="Username">
   				</div>
   				<div class="form-group">
     				<label for="password">Password</label>
     				<input [(ngModel)]="password" type="password" class="form-control" id="password" placeholder="Password">
   				</div>
   				<button type="submit" class="btn btn-default">Submit</button>
     			<a [routerLink]="['/register']">Click here to register</a>
			</form>
		</div>
	`
})

export class Login {
	username: String;
	password: String;

	constructor(public router: Router, public http: Http) {
	}

	login() {
		event.preventDefault();
		let providedUsername = this.username,
			providedPassword = this.password;

		let body = JSON.stringify({
			providedUsername,
			providedPassword
		});

		this.http.post('/login', body, {
			headers: contentHeaders
		})
			.subscribe(
			response => {
				console.log(response.json());
				localStorage.setItem("subporter_token", response.json().token);
				this.router.navigate(['home']);
			},
			error => {
				console.error(error.text);
			}
		)
	}

	register(event) {
		event.preventDefault();
		this.router.navigate(['register']);
	}
}