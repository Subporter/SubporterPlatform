import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../common/headers'
import { Footer } from "../common/footer/Footer";
import { Header } from "../common/header/Header";
import {ApiService} from '../../services/ApiService';
import {Subscription } from 'rxjs';



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
  game:JSON;
home:String;
away:String;
date:String;
stadion:String;
banner:String;
loans:JSON;
id:String;
test:JSON;
gameId: number;
price:number;
size:number;
lent:number=0;
lendable:number=0;

    private subscription: Subscription;



  private loggedIn = false;


	constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService, private activatedRoute: ActivatedRoute) {

      this.loggedIn = !!localStorage.getItem('id_token');
	}


ngOnInit(){
	this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        let id = param['id'];
		this.gameId = id;
		this._callApi("Anonymous", "api/loans/game/"+id);

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
			response =>this.getGames(response.text()),
			error => this.goHome()
		);




  }

  getGames(data){
     let Data = data;
     let jsonData = JSON.parse(Data);
     this.game = jsonData.data;

	 if(!this.game){
	  this.router.navigateByUrl('../');

	 }


	 this.home = jsonData.data[0].game.home.name;
	 this.away = jsonData.data[0].game.away.name;
	 this.date = jsonData.data[0].game.date;
     this.stadion = jsonData.data[0].game.home.stadion;
	 this.banner = jsonData.data[0].game.banner;
	 this.loans = jsonData.data;
	 this.price = jsonData.data[0].game.home.price;

	 this.test = jsonData.data[0].game.home;

	 this.size= this.loans.length;

	 console.log(jsonData);

	 this.lent = jsonData.count;
	 this.lendable = this.loans.length;

	//  for(let i = 0; i<this.loans.length; i++){
	// 	 if(this.loans.paid == true){
	// 		 this.lent ++ ;
	// 		 this.loans.splice(i,1);
	// 	 }else{
	// 		 this.lendable ++ ;

	// 	 }
	//  }






	 console.log(this.lendable);
	 	 console.log(this.lent);


  }

  goHome(){
  }

}