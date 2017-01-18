import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../common/headers'
import { Footer } from "../common/footer/Footer";
import { Header } from "../common/header/Header";
import { ApiService } from '../../services/ApiService';
import { Subscription } from 'rxjs';
import "materialize-css";
import "angular2-materialize";
import { Location } from '@angular/common';
import { CookieService } from 'angular2-cookie/core';





@Component({
	selector: 'listings',
	templateUrl: './app/components/listing/listing.view.html',
	styleUrls: ['../../css/listing.css']
})

export class Listing {

	jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();
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
	price: String;
	id: number;

	private loggedIn = false;
	private subscription: Subscription;



	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService, private activatedRoute: ActivatedRoute, private _location: Location, private _cookieService: CookieService) {

		this.loggedIn = !!localStorage.getItem('id_token');
	}


	ngOnInit() {

		this.subscription = this.activatedRoute.params.subscribe(
			(param: any) => {
				let id = param['id'];
				this.id = id;
				this._callApi("Anonymous", "api/loans/" + id);

			});




	}





	useJwtHelper() {
		let token = localStorage.getItem("id_token");
		console.log("Token:", token);

		console.log(
			this.jwtHelper.decodeToken(token),
			this.jwtHelper.getTokenExpirationDate(token),
			this.jwtHelper.isTokenExpired(token)
		)
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

		console.log(this.loan);

		if (this.isEmpty(this.loan)) {
			this.router.navigateByUrl('/landing');

		}

		this.home = jsonData.data.game.home.name;
		this.away = jsonData.data.game.away.name;
		this.date = jsonData.data.game.date;
		this.stadion = jsonData.data.game.home.stadion;
		this.banner = jsonData.data.game.banner;

		this.profile = jsonData.data.lent_out_by;
		this.avatar = jsonData.data.lent_out_by.avatar;
		this.name = jsonData.data.lent_out_by.name;
		this.firstname = jsonData.data.lent_out_by.firstname;

		if (("address" in jsonData.data.lent_out_by) ) {
			this.city = jsonData.data.lent_out_by.address.city;
		} 


		this.price = jsonData.data.game.home.price;

		console.log(this.profile);



	}

	back() {
		this._location.back();

	}

	huurAbbo() {
		if (this.loggedIn) {

			this._cookieService.put(this.id.toString(), this.id.toString());

			this.router.navigateByUrl('../cart');





		} else {
			alert("Gelieve eerst in te loggen");
			this.router.navigateByUrl('../login/' + this.id);
		}
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



}