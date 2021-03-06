import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../../common/Headers'
import { ApiService} from '../../../services/ApiService';

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
						<label for="password">Wachtwoord</label>
					</div>
				</div>
				<button type="submit" class="btn btn-default">Log in</button>
				<a [routerLink]="['/']">Terug naar home</a>
			</form>
		</div>
		<div class="register-section">
			<h1>Nog geen account?</h1>
			<p>Registreer snel om volledige toegang te verkrijgen.</p>
			<br/>
			<button class="btn" [routerLink]="['/register']">
				Registreer
			</button>
		</div>
	</div>
	`,
    styleUrls: ['../../../css/login.css']

})

export class Login {
    email: String;
    password: String;

    constructor(public router: Router, public http: Http, public apiService: ApiService) { }

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
                if (response.json().success === true) {
                    this.apiService.get('api/users').subscribe(
                        response => {
                            var jsonrespons = response.json().data;
                        },
                        error => {
                            console.error(error.text());
                        }
                    )

                    localStorage.setItem("id_token", response.json().token);
                    this.router.navigate(['landing']);
                }
            },
            error => {
                alert(error.text());
                console.error(error.text());
            })
    }

    register(event) {
        event.preventDefault();
        this.router.navigate(['register']);
    }
}