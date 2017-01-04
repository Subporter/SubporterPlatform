import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../common/Headers'
import { Footer } from "../common/footer/Footer";
import { Header } from "../common/header/Header";
import {ApiService} from '../../services/ApiService';
import "materialize-css";
import "angular2-materialize";


@Component({
	selector: 'search',
	 templateUrl: './app/components/search/search.view.html',
	  styleUrls: ['../../css/css/search.css']
})

export class Search {

  jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();
  games:JSON;

  private loggedIn = false;


	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService) {

      this.loggedIn = !!localStorage.getItem('id_token');
	}


	ngOnInit() { 
  
  this._callApi("Anonymous", "api/games/");
  



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
		this.apiService.call(url).subscribe(
			response =>  this.getGames(response.text()),
			error => this.response = error.text
		);

    

    
  }

  getGames(data){
     let Data = data;
     let jsonData = JSON.parse(Data);
     this.games = jsonData.data;

	 console.log(this.games);

  }

 
  
 

}

