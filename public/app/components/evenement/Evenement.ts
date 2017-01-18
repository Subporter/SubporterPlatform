import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../common/headers'
import { Footer } from "../common/footer/Footer";
import { Header } from "../common/header/Header";
import { ApiService } from '../../services/ApiService';
import { Subscription } from 'rxjs';



@Component({
	selector: 'evenement',
	templateUrl: './app/components/evenement/evenement.view.html',
	styleUrls: ['../../css/evenement.css']
})

export class Evenement {


	jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();
	game: JSON;
	home: String;
	away: String;
	date: String;
	stadion: String;
	banner: String;
	loans = [];
	id: String;
	test: JSON;
	gameId: number;
	price: number;
	size: number;
	lent: number = 0;
	lendable: number = 0;

	private subscription: Subscription;



	private loggedIn = false;


	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService, private activatedRoute: ActivatedRoute) {

		this.loggedIn = !!localStorage.getItem('id_token');
	}


	ngOnInit() {
		this.subscription = this.activatedRoute.params.subscribe(
			(param: any) => {
				let id = param['id'];
				this.gameId = id;
				this._callApi("Anonymous", "api/loans/game/" + id);

			});
	}


	ngOnDestroy() {
		// prevent memory leak by unsubscribing
		this.subscription.unsubscribe();
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
			response => this.getGames(response.text()),
			error => this.goHome()
		);




	}

	getGames(data) {
		let Data = data;
		let jsonData = JSON.parse(Data);
		this.game = jsonData.data;

		if (this.isEmpty(this.game)) {
			this.router.navigateByUrl('/landing');

		}




		this.home = jsonData.data[0].game.home.name;
		this.away = jsonData.data[0].game.away.name;
		this.date = jsonData.data[0].game.date;
		this.stadion = jsonData.data[0].game.home.stadion;
		this.banner = jsonData.data[0].game.banner;
		this.price = jsonData.data[0].game.home.price;

		this.test = jsonData.data[0].game.home;


		console.log(jsonData);

		this.lent = jsonData.count;

	
		let loansRaw = jsonData.data;

		this.getUserId(loansRaw);








	}

	goHome() {
	}

	getUserId(loans) {


		this.apiService.get("api/users").subscribe(
			response => this.filterLoans(response.text(), loans),
			error => this.goHome()
		);




	}


	filterLoans(data, loans) {
		let Data = data;
		let jsonData = JSON.parse(Data);
		let user = jsonData.data;
		let userId = user._id;






		let loansRaw = loans;
		let counter = 0;
		for (let loan of loansRaw) {
			console.log(loan.lent_out_by._id);
			console.log(this.loggedIn);
			if (loan.lent_out_by._id != userId) {
				this.loans[counter] = loan;
				counter++;
			}
		}

		if (!this.isEmpty(this.loans)) {

			this.size = this.loans.length;
			this.lendable = this.loans.length;



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