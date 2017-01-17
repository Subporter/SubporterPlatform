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
import {MaterializeAction, MaterializeDirective} from 'angular2-materialize';



@Component({
	selector: 'profile',
	 templateUrl: './app/components/profile/profile.view.html',
	  styleUrls: ['../../css/profile.css']
})

export class Profile {

    modalActions = new EventEmitter<string|MaterializeAction>();
    modalActions2 = new EventEmitter<string|MaterializeAction>();
    modalActions3 = new EventEmitter<string|MaterializeAction>();

  jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();
  games:JSON;
    form1: any;
    favorites:JSON;
    showFavorites = false;
    showNew = false;
    favoriteId:number;
    teams = [];
    user = [];;


  private loggedIn = false;


	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService) {

      this.loggedIn = !!localStorage.getItem('id_token');

    //    this.service.progress$.subscribe(
    //   data => {
    //     console.log('progress = '+data);
    //   });
	}


// changePass(event) {
//     console.log('onChange');
//     var files = event.srcElement.files;
//     console.log(files);
//     this.service.makeFileRequest('http://localhost:1337/api/subscriptions', [], files).subscribe(() => {
//       console.log('sent');
//     });
//   }

//   save (data?:any) {
//       console.log("Data", data);
//       this.form1 = data;
//       return false;
//   }

	ngOnInit() {

        if(!this.loggedIn){
            this.router.navigateByUrl('/');
        }

  this._callApi("Anonymous", "api/users");







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
			response =>  this.getUser(response.text()),
			error => this.response = error.text
		);




  }

  getUser(data){
     let Data = data;
     let jsonData = JSON.parse(Data);
     this.user = jsonData.data;
     this.favorites = jsonData.data.favorites;

     if (!this.isEmpty(this.favorites)){
         this.showFavorites = true;
     }

     this.apiService.get("api/teams").subscribe(
			response =>  this.getTeams(response.text()),
			error => this.response = error.text
		);

	 console.log(this.user);

  }

  removeFavorite(id){

   this.modalActions.emit({action:"modal",params:['open']});


this.favoriteId = id;


  }

  removeFavoriteReal(){
        this.apiService.post("api/teams/favorite/"+this.favoriteId, null).subscribe(
  	 		response =>  this.showSuccess(),
  	 		error => this.response = error.text
  	 	);

  }

showSuccess(){
   this.modalActions2.emit({action:"modal",params:['open']});

}

closeModal1(){
           this.modalActions.emit({action:"modal",params:['close']});

}

closeModal(){
       this.modalActions2.emit({action:"modal",params:['close']});
      location.reload();

}

closeModal3(){
       this.modalActions3.emit({action:"modal",params:['close']});

}

showAdd(){



this.showFavorites=false;
this.showNew = true;



}

showFavoritesBack(){

this._callApi("Anonymous", "api/users");



this.showFavorites=true;
this.showNew = false;
}

getTeams(data){

    let counter = 0

    let Data = data;
     let jsonData = JSON.parse(Data);
     let teamsRaw = jsonData.data;

     for(let team of teamsRaw){
         let success = true;
         for (let favorite of this.favorites){
         if(team._id == favorite._id){
                success = false;
         }

         }
        if(success=== true){
            this.teams[counter] = team;
            counter ++;
        }

     }

     console.log(this.teams);



}

updateFavorite(){
     let select = document.getElementById('select');
     select = select.options[select.selectedIndex].value;

     console.log(select);

     let apiString = "api/teams/favorite/"+select;

     this.apiService.post(apiString, null).subscribe(
  	 		response =>  console.log(response.text()),
  	 		error => console.log(error.text)
  	 	);

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




}

