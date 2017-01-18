import { Component, Input, EventEmitter } from '@angular/core';
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
import {MaterializeAction, MaterializeDirective} from 'angular2-materialize';




@Component({
	selector: 'offer',
	 templateUrl: './app/components/offer/offer.view.html',
	  styleUrls: ['../../css/offer.css']
})

export class Offer {

    modalActions = new EventEmitter<string|MaterializeAction>();
    modalActions2 = new EventEmitter<string|MaterializeAction>();


  jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();
  games:JSON;
  show=true;
   gameNames = [];
   user = [];
   show2 = false;
   show3 = false;
   show4 = true;
   gameId :number;
   subscriptions = [];
   selectedSubscription:JSON;
   place:String;
   teamHome: String;
   teamAway:String;
   gameDate:String;
   sub = false;
   selectedGameLoans:JSON;
   used= false;

  private loggedIn = false;




	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService) {

      this.loggedIn = !!localStorage.getItem('id_token');
	}


	ngOnInit() {

    this.sub = false;

        if(!this.loggedIn){
            this.show = false;
         }else{


           let user ="api/users/";

           this.apiService.get(user).subscribe(
		         	response =>  this.getSubscriptions(response.text()),
			         error => this.response = error.text
	    	 );





         }

}


getSubscriptions(data){

 let Data = data;
     let jsonData = JSON.parse(Data);
     let user = jsonData.data;
     this.user = user;

     console.log(user);



     if(!this.isEmpty(user.subscriptions)){

       this._callApi("Anonymous", "api/games/");


     }else{
       this.show2 = false;

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






 isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

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


showAbbo(){


    let game = $(".autocomplete").val();
    let parts[]= game.split(" ");
    let id = parts[0];



    if(parseInt(id)){
      let selectedGame:JSON;

        this.gameId = parseInt(id);
        let gameId = this.gameId;


        for(let game of this.games){
          if (gameId == game._id){
             selectedGame = game;
          }
        }

        console.log(selectedGame);
          let user = this.user;
          let subscriptions = user.subscriptions;
          let counter = 0;

          console.log(subscriptions);

            if(selectedGame){
              this.selectedGame = selectedGame;
              this.selectedGameLoans = selectedGame.loans;

              this.teamHome = selectedGame.home.name;
              this.teamAway = selectedGame.away.name;
              this.gameDate = selectedGame.date;



            for(let subscription of subscriptions){

             if(subscription.team._id == selectedGame.home._id){

                for(let loan of this.selectedGameLoans){
                  if(loan.subscription._id==subscription._id){
                    this.used = true;
                  }
              }


               if(!this.used){
                this.subscriptions[counter] = subscription;

               this.sub = true;

               counter ++;
                 console.log("adasdas");


              }else{
                this.sub = true;

              }




             }

           }

           if(this.sub === false){
              alert("Je hebt geen abonnement voor deze wedstrijd.")

           }else{
              this.show4 = false;
               this.show3 = false;
               this.show2 = true;

           }

           }


    }else{
        alert("Je hebt geen juiste wedstrijd geselecteerd.");
    }

    if(this.isEmpty(selectedGame)){
        alert("Je hebt geen juiste wedstrijd geselecteerd.");
    }







}

showWeds(){
  this.show4 = true;
  this.show3 = false;
  this.show2 = false;
}

showAbbo2(){
  this.show4 = false;
  this.show3 = false;
  this.show2 = true;
}

showBeve(id){


  for(let subscription of this.subscriptions){
    if (id == subscription._id){
        this.selectedSubscription = subscription;
        this.place = subscription.place;

    }
  }


  this.show4 = false;
  this.show3 = true;
  this.show2 = false;
}


offerSubscription(){

  let game = this.selectedGame._id;
  let subscription =  this.selectedSubscription._id;

  let body = JSON.stringify({
            game,
            subscription
        });

   this.apiService.post("api/loans", body).subscribe(
  	 		response =>  this.showSuccess(),
  	 		error => this.response = error.text
  	 	);

}

showSuccess(){

  console.log(this.selectedGame.home["_id"]);
    var socket = io.connect();
    socket.emit("offerAdded", this.selectedGame.home["_id"], this.selectedGame.away["_id"]);

   this.modalActions2.emit({action:"modal",params:['open']});
}


openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }


}

