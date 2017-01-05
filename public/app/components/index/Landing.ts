import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../common/Headers'
import * as $ from 'jquery';
import 'slick';
import { Footer } from "../common/footer/Footer";
import { Header } from "../common/header/Header";
import {Topwedstrijd} from "./Topwedstrijden";
import {Weekwedstrijd} from "./Weekwedstrijden";
import {ApiService} from '../../services/ApiService';


@Component({
	selector: 'landing',
	 templateUrl: './app/components/index/landing.view.html',
	  styleUrls: ['../../css/css/landing.css']
})

export class Landing {

  jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();
  jsonDataData:JSON;
  count:number;
  featuredGames: JSON;
  games:JSON;
     gameNames = [];


 //default Belgium, I guess
  compId:String = "1";
  private loggedIn = false;


	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService) {

      this.loggedIn = !!localStorage.getItem('id_token');
	}


ngOnInit() {

  this._callApi("Anonymous", "api/teams/competition/"+ this.compId);
  // this._callApi("kek", "api/users");



  	this.apiService.get("api/games/featured/1").subscribe(
			response => this.getFeaturedGames(response.text()),
     
        
			error => this.response = error.text
		);


    	this.apiService.get("api/games/").subscribe(
			response =>  this.showGames(response.text()),
			error => this.response = error.text
		);




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



showGames(data){

   let Data = data;
     let jsonData = JSON.parse(Data);
     this.games = jsonData.data;

    




    var obj = "{"
for (let game of this.games) {
  let home = game.home.name;
  let away = game.away.name;
  let gamename = "\"" +game._id + " " + home + " - " + away + "\"";
  obj = obj + gamename + ": null,";

}
obj = obj.substring(0, obj.length - 1);
obj = obj + "}";
obj = JSON.parse(obj);

this.gameNames = obj;
 console.log(obj);

}

  _callApi(type, url) {
		this.apiService.get(url).subscribe(
			response => this.getTeam(response.text()),
     
        
			error => this.response = error.text
		);




  }

  getFeaturedGames(data){


     let Data = data;
     let jsonData = JSON.parse(Data);
     this.featuredGames = jsonData.data;



  }

   getTeam(data){
     let Data = data;
     let jsonData = JSON.parse(Data);
     this.jsonDataData = jsonData.data;



     this.displayCarousel();

  }

  displayCarousel(){
     $('.carousel-class').slick({  infinite: true, autoplay:true, arrows:false,
  slidesToShow: 12,
  slidesToScroll: 1 });
  }



  test(){
    console.log("test");
  }

  goToTeamPage(id){
    //route to teampage
    alert(id);
  }


scrollToDiv(){

  $('html, body').animate({
        scrollTop: $("#section1").offset().top
    }, 1000);

}


search(){


    let game = $(".autocomplete").val();
    let parts[]= game.split(" ");
    let id = parts[0];



    if(parseInt(id)){

        id = parseInt(id);
        let location = "evenement/"+id;

        window.location.assign(location);

    }



}







}

