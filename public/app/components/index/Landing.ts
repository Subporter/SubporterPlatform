import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../common/Headers'
import * as $ from 'jquery';
import 'slick';
import { Footer } from "../common/footer/Footer";
import {ApiService} from '../../services/ApiService';
import {Team} from '../../models/team.model';


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

 //default Belgium, I guess
  compId:String = "585e97f0e0f6ae66b70ee218";


	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService) {
	}


ngOnInit() { 
  
  this._callApi("Anonymous", "api/teams/comp/"+ this.compId);
  
 


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




search(){
  }

  _callApi(type, url) {
		this.apiService.call(url).subscribe(
			response => this.getTeam(response.text()),
			error => this.response = error.text
		);

    

    
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







}

