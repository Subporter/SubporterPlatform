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
import {CookieService} from 'angular2-cookie/core';





@Component({
	selector: 'cart',
	 templateUrl: './app/components/cart/cart.view.html',
	  styleUrls: ['../../css/css/cart.css']
})

export class Cart {

  jwt: String;
	decodedJwt: String;
	response: String;
	api: String;
	jwtHelper: JwtHelper = new JwtHelper();
  loan:JSON;
  home:String;
away:String;
date:String ;
stadion:String;
banner:String ;
profile:JSON;
avatar:String;
name:String;
firstname:String;
city:String;
prices:number;
price:number=0;
id:number;
cookie:any;
loans:JSON= [];
counter: number = 0;
show = true;

  private loggedIn = false;
      private subscription: Subscription;



	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService, private activatedRoute: ActivatedRoute, private _location: Location,  private _cookieService:CookieService) {

      this.loggedIn = !!localStorage.getItem('id_token');
	}


	ngOnInit() {
        let  x = this._cookieService.getAll();
        this.cookie = x;

        if(this.isEmpty(x)){
            this.show = false;
            this.showEmpty();
        }else{
            this.showCart();
        }



        console.log(x);

}

showCart(){




    let cookie = this.cookie;

for(var cook in cookie){

    this._callApi("Anonymous", "api/loans/"+cook);


}



}

showEmpty(){



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
			response =>  this.getLoan(response.text()),
			error => this.response = error.text
		);




  }

  getLoan(data){
     let Data = data;
     let jsonData = JSON.parse(Data);
     this.loan = jsonData.data;

     this.loans[this.counter] = this.loan;
    //  let date = new Date ( this.loans[this.counter].game.date);
    //  console.log(date);
    //  let fullDate = new Date( date.getDate()  + '/' + (date.getMonth()+1) + "/" + date.getFullYear());
    //  fullDate.toLocaleString().substring(0,fullDate.toLocaleString().indexOf(' '));
    //  console.log (fullDate);


    this.price += (this.loan.game.home.price *0.1);




     console.log(this.loan);
     console.log(this.loans);

     this.counter ++;

  }

  back(){
      this._location.back();

  }

  removeCookie(cookie:number){
      this._cookieService.remove(cookie);
      location.reload();
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