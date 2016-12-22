import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../../common/Headers'

@Component({
	selector: 'register',
	template: `
		<div>
			<h1>Register</h1>
			<form (submit)="register($event)">
				<div class="form-group">
     				<label for="username">Username</label>
     				<input [(ngModel)]="username" type="text" class="form-control" name="username" id="username" placeholder="Username">
   				</div>
				<div class="form-group">
     				<label for="email">Email</label>
     				<input [(ngModel)]="email" type="email" class="form-control" name="email" id="email" placeholder="Email">
   				</div>
   				<div class="form-group">
     				<label for="password">Password</label>
     				<input [(ngModel)]="password" type="password" class="form-control" name="password" id="password" placeholder="Password">
   				</div>
				<div class="form-group">
     				<label for="confirmPassword">Confirm password</label>
     				<input [(ngModel)]="confirmPassword" type="password" class="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm password">
   				</div>
   				<button type="submit" class="btn btn-default">Submit</button>
     			<a [routerLink]="['/login']">Click here to login</a>
			</form>
		</div>
	`
})

export class Register {
	username: String;
	email: String;
	password: String;
	confirmPassword: String;

	constructor(public router: Router, public http: Http) {
	}

	register(event) {
		event.preventDefault();
		if (this.password === this.confirmPassword) {
			let username = this.username,
				email = this.email,
				password = this.password;

			let body = JSON.stringify({
				username,
				email,
				password
			});

			this.http.post('/register', body, {
				headers: contentHeaders
			})
				.subscribe(
				response => {
					console.log(response.json());
					localStorage.setItem("id_token", response.json().token);
					this.router.navigate(['home']);
				},
				error => {
					alert(error.text())
					console.error(error.text());
				}
			)
		} else {
			console.log("Passwords don't match");
		}
	}

	login(event) {
		event.preventDefault();
		this.router.navigate(['login']);
	}
}