import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../common/Headers'
import { Footer } from "../common/footer/Footer";
import { Header } from "../common/header/Header";
import { ApiService } from '../../services/ApiService';
import "materialize-css";
import "angular2-materialize";
import * as $ from 'jquery';
import { AfterViewInit } from '@angular/core';

@Component({
	selector: 'search',
	templateUrl: './app/components/search/search.view.html',
	styleUrls: ['../../css/search.css']
})

export class Search  {

	jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();
	games: JSON;
	gamesCopy: JSON;
	public keyword: String;
	country: String;
	date:String;

	private loggedIn = false;


	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService) {

		this.loggedIn = !!localStorage.getItem('id_token');

	}

	ngOnInit() {

		this._callApi("Anonymous", "api/games/");





	}



	


	// ngAfterViewInit() {

	// 	$(".filterSearch").on('keyup', function (e) {
	// 		if (e.keyCode == 13) {
	// 			let value = $(".filterSearch").val();
	// 			this.keyword = value;


	// 			console.log(this.keyword);

	// 		}

	// 	});

	// }

	filterKeyword() {

		let value = $(".filterSearch").val();
		this.keyword = value;

		this.filterGames();

	}



	filterGames() {


		let gamesFilter = [];

		for (let game of this.gamesCopy) {
			let home = game.home.name;
			let away = game.away.name;
			if (home.toLowerCase().includes(this.keyword.toLowerCase()) || away.toLowerCase().includes(this.keyword.toLowerCase())) {
				gamesFilter.push(game);
			}
		}

		this.games = gamesFilter;

	}


	removeKeyword() {
		this.keyword = "";
		this.games = this.gamesCopy;
	}


	filterCountry(countryId) {

		this.getCountryById(countryId);


		let gamesFilter = [];

		for (let game of this.gamesCopy) {

			let country = game.competition.country._id;
			if (country == countryId) {
				gamesFilter.push(game);
			}


		}

		this.games = gamesFilter;

		if (this.isEmpty(this.games)) {

		}



	}

	getCountryById(id) {

		let url = "api/countries/" + id;

		this.apiService.get(url).subscribe(
			response => this.showCountry(response.text()),
			error => this.response = error.text
		);


	}


	showCountry(data) {

		console.log(data);

		let Data = data;
		let jsonData = JSON.parse(Data);
		let country = jsonData.data;
		this.country = country.name;

	}

	filterCountryKeyword() {

		this.country = $(".filterCountrySearch").val();

		let gamesFilter = [];

		for (let game of this.gamesCopy) {
			let countryName = game.competition.country.name;
			if (countryName.includes(this.country.toLowerCase())) {
				gamesFilter.push(game);
			}
		}

		this.games = gamesFilter;



	}

	removeCountry() {
		this.country = "";
		this.games = this.gamesCopy;
	}


	filterDate(date) {
		this.date = date;

		let searchDate: Date;
		let endDate: Date;



		switch (date) {
			case "today": searchDate = new Date();
			endDate = null;
				break;
			case "tomorrow": searchDate = new Date();
				searchDate.setDate(searchDate.getDate() + 1);
				break;
			case "weekend": searchDate = this.getFriday();
				endDate = this.getSunday();
				break;
			case "week": searchDate = this.getMonday();
				endDate = this.getSunday();
				break;
			case "nextWeek": searchDate = this.getMondayNext();
				endDate = this.getSundayNext();
				break;
			case "month": let dateMonth = new Date();
				searchDate = new Date(dateMonth.getFullYear(), dateMonth.getMonth(), 1);
				endDate = new Date(dateMonth.getFullYear(), dateMonth.getMonth() + 1, 0);
				break;
		}


		if (endDate != null) {

			
			let gamesFilter = [];

			for (let game of this.gamesCopy) {
				let date =new Date(game.date);

				if (this.checkDateRange(searchDate,endDate,date)) {
					gamesFilter.push(game);
				}
			}

			this.games = gamesFilter;

		} else {

			let gamesFilter = [];

			for (let game of this.gamesCopy) {
				let date =new Date(game.date);

				if (this.isEqual(searchDate, date)) {
					gamesFilter.push(game);
				}
			}

			this.games = gamesFilter;

		}




	}

	removeDate(){
		this.date = "";
		this.games = this.gamesCopy;
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
			error => this.response = error.text
		);




	}

	getGames(data) {
		let Data = data;
		let jsonData = JSON.parse(Data);
		this.games = jsonData.data;
		this.gamesCopy = this.games;



		console.log(this.games);

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


	getMonday() {
		let d = new Date();
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}


	getFriday() {
		let d = new Date();
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		diff += 4;
		return new Date(d.setDate(diff));
	}

	getSunday() {
		let d = new Date();
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		diff += 6;
		return new Date(d.setDate(diff));
	}


	getMondayNext() {
		let d = new Date();
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		diff += 7;
		return new Date(d.setDate(diff));
	}


	getSundayNext() {
		let d = new Date();
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		diff += 13;
		return new Date(d.setDate(diff));
	}


 isEqual(startDate, endDate) {
	 startDate.setHours(0,0,0,0);
	 	 endDate.setHours(0,0,0,0);
    return endDate.valueOf() == startDate.valueOf();
}

checkDateRange(searchDate, endDate, date){

	searchDate.setHours(0,0,0,0);
	endDate.setHours(0,0,0,0);
	date.setHours(0,0,0,0);

	if(date <= endDate && date >= searchDate){
		return true;
	}else{
		return false;
	}

}



}



