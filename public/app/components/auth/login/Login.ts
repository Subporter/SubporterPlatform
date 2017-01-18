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

		<button class="btn" [routerLink]="['/register']"> Registreer </button>


	</div>
</div>









	`,
    styleUrls: ['../../../css/login.css']

})

export class Login {
    email: String;
    password: String;

    constructor(public router: Router, public http: Http, public apiService: ApiService) {
    }

    // public options = {
    //     timeOut: 5000,
    //     lastOnBottom: true,
    //     clickToClose: true,
    //     maxLength: 0,
    //     maxStack: 7,
    //     showProgressBar: true,
    //     pauseOnHover: true,
    //     preventDuplicates: false,
    //     preventLastDuplicates: 'visible',
    //     rtl: false,
    //     animate: 'scale',
    //     position: ['right', 'bottom']
    // };



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
                if (response.json().success === true) {

                    
                    socketLogin(response.json().id);


                    this.apiService.get('api/users').subscribe(
                        response => {
                            console.log("USER DATA");
                            var jsonrespons = response.json().data;
                            console.log(jsonrespons["favorites"]);

                            socketFav(jsonrespons["favorites"]);

                           
                        },
                        error => {
                            console.log(error.text());
                        }
                    )


                   

                    localStorage.setItem("id_token", response.json().token);
                    this.useJwtHelper();
                    this.router.navigate(['landing']);
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

    // onCreate(event) {
    //     console.log(event);
    // }

    // onDestroy(event) {
    //     console.log(event);
    // }


}