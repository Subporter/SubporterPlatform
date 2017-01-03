import { Component, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../common/headers'
import { Footer } from "../common/footer/Footer";
import { Header } from "../common/header/Header";
import {ApiService} from '../../services/ApiService';
import {Subscription } from 'rxjs';
import "materialize-css";
import "angular2-materialize";
import {Location} from '@angular/common';




@Component({
	selector: 'listings',
	 templateUrl: './app/components/listing/listing.view.html',
	  styleUrls: ['../../css/css/listing.css']
})

export class Listing {

  jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();
  game:JSON;
  home:String;
away:String;
date:String ;
stadion:String;
banner:String ;

  private loggedIn = false;
      private subscription: Subscription;



	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService, private activatedRoute: ActivatedRoute, private _location: Location) {

      this.loggedIn = !!localStorage.getItem('id_token');
	}


	ngOnInit() { 
  
  this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        let id = param['id'];
		this._callApi("Anonymous", "api/games/"+id);

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
		this.apiService.call(url).subscribe(
			response =>  this.getGame(response.text()),
			error => this.response = error.text
		);

    

    
  }

  getGame(data){
     let Data = data;
     let jsonData = JSON.parse(Data);
     this.game = jsonData.data;

    console.log(this.game);    
	  if(!this.game){
	   this.router.navigateByUrl('../');

	  }

	 this.home = jsonData.data.home.name;
	 this.away = jsonData.data.away.name;
	 this.date = jsonData.data.date;
     this.stadion = jsonData.data.home.stadion;
	 this.banner = jsonData.data.banner;



  }

  back(){
              this._location.back();

  }


}