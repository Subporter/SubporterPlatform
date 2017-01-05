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
import * as $ from 'jquery';



@Component({
	selector: 'offer',
	 templateUrl: './app/components/offer/offer.view.html',
	  styleUrls: ['../../css/css/offer.css']
})

export class Offer {

  jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();
  games:JSON;
  show:true;
   gameNames = [];

  private loggedIn = false;

  


	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService) {

      this.loggedIn = !!localStorage.getItem('id_token');
	}


	ngOnInit() {

        if(!this.loggedIn){
            this.show = false;


         }else{
            this._callApi("Anonymous", "api/games/");

         }

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
			response =>  this.getGames(response.text()),
			error => this.response = error.text
		);


  }

  getGames(data){
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

  


nextTab(){

    let game = $(".autocomplete").val();
    let parts[]= game.split(" ");
    let id = parts[0];



    if(parseInt(id)){

        id = parseInt(id);



        // $('.abbo').addClass("active");
        // $('.weds').removeClass("active");
        // $('#abonnement').css("display","block";)
        // $('#wedstrijd').css("display","none";)
        // $('.indicator').css("right": "443.453px");
        // $('.indicator').css("left": "221.719px");




        
    }else{
        alert("Je hebt geen juiste wedstrijd geselecteerd.")
    }


}



}

