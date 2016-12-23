import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../../common/headers'

@Component({
    selector: 'login',
    template: `
		<div class="login container">
	<div class="login-section">
		<h1>Login</h1>
		<form (submit)="login($event)">
			<div class="form-group">
				<div class="input-field">
					<input [(ngModel)]="email" type="email" class="form-control validate" name="email" id="email">
					<label for="email">Email</label>

				</div>
			</div>
			<div class="form-group">
				<div class="input-field">

					<input [(ngModel)]="password" type="password" class="form-control validate" name="password" id="password">
					<label for="password">Password</label>

				</div>
			</div>
			<button type="submit" class="btn btn-default">Submit</button>
			<a [routerLink]="['/']">Click here to go landing</a>
		</form>
	</div>
	<div class="register-section">
		<h1>Not a member?</h1>
		<p>If you're not yet registered, please register now to obtain full access.</p>
		<br/>

		<button class="btn" [routerLink]="['/register']"> Register now </button>


	</div>
</div>







	`,
    styleUrls: ['../../../css/css/login.css']

})

export class Login {
    email: String;
    password: String;

    constructor(public router: Router, public http: Http) {
    }

    jwtHelper: JwtHelper = new JwtHelper();

    useJwtHelper() {
        let token = localStorage.getItem("id_token");
        console.log("Token:", token);

        console.log(
            this.jwtHelper.decodeToken(token),
            this.jwtHelper.getTokenExpirationDate(token),
            this.jwtHelper.isTokenExpired(token)
        )
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
                if (response.json().success == true) {
                    localStorage.setItem("id_token", response.json().token);
                    this.useJwtHelper();
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