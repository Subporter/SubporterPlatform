import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../../common/Headers'
import * as $ from 'jquery';
import 'slick';
import { Footer } from "../common/footer/Footer";
import { Header } from "../common/header/Header";
import { ApiService } from '../../services/ApiService';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';




@Component({
  selector: 'landing',
  templateUrl: './app/components/index/landing.view.html',
  styleUrls: ['../../css/landing.css']
})

export class Landing {

  jwt: String;
  decodedJwt: String;
  response: String;
  api: String;
  jwtHelper: JwtHelper = new JwtHelper();
  jsonDataData: JSON;
  count: number;
  featuredGames: JSON;
  games: JSON;
  gameNames = [];
  countries: JSON;
  weekGames = [];
  showWeek = true;
  private isAdmin = false;

  compId: String = "1";
  private isLoggedIn = false;


  constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public apiService: ApiService) {

    this.isLoggedIn = !!localStorage.getItem('id_token');
  }


  ngOnInit() {

    this._callApi("Anonymous", "api/teams/competition/" + this.compId);

    this.apiService.get('check/admin').subscribe(
      response => {
        let result = JSON.parse(response.text()).success;
        this.isAdmin = result;
      },
      error => {
        this.isAdmin = false;
      }
    );


    this.apiService.get("api/games/featured/1").subscribe(
      response => this.getFeaturedGames(response.text()),


      error => this.response = error.text
    );

    this.apiService.get("api/games/week/1").subscribe(
      response => this.getWeeklyGames(response.text()),


      error => this.response = error.text
    );


    this.apiService.get("api/games/").subscribe(
      response => this.showGames(response.text()),
      error => this.response = error.text
    );


    this.apiService.get("api/countries/").subscribe(
      response => this.showCountries(response.text()),
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

  showCountries(data) {

    let Data = data;
    let jsonData = JSON.parse(Data);
    this.countries = jsonData.data;
  }

  onChange(country) {

    let Country = "api/games/featured/" + country;

    this.apiService.get(Country).subscribe(
      response => this.getFeaturedGames(response.text()),


      error => this.response = error.text
    );



  }

  onChange2(country) {

    let Country = "api/games/week/" + country;

    this.apiService.get(Country).subscribe(
      response => this.getWeeklyGames(response.text()),


      error => this.response = error.text
    );

  }




  showGames(data) {

    let Data = data;
    let jsonData = JSON.parse(Data);
    this.games = jsonData.data;






    var obj = "{"
    for (let game of this.games) {
      let home = game.home.name;
      let away = game.away.name;
      let gamename = "\"" + game._id + " " + home + " - " + away + "\"";
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

  getFeaturedGames(data) {


    let Data = data;
    let jsonData = JSON.parse(Data);
    this.featuredGames = jsonData.data;



  }

  getWeeklyGames(data) {
    let Data = data;
    let jsonData = JSON.parse(Data);
    this.weekGames = jsonData.data;
    let counter = 0;




    //  for(let game of weekGames){

    //         if(game.loans.size != 0){

    //           this.weekGames[counter]= game;
    //           counter ++;

    //         }


    //  }

    //  if(this.isEmpty(this.weekGames)){
    //    this.showWeek = false;
    //  }


  }

  getTeam(data) {
    let Data = data;
    let jsonData = JSON.parse(Data);
    this.jsonDataData = jsonData.data;



    this.displayCarousel();

  }

  displayCarousel() {
    $('.carousel-class').slick({
      infinite: true, autoplay: true, arrows: false,
      slidesToShow: 12,
      slidesToScroll: 1
    });
  }



  test() {
    console.log("test");
  }

  goToTeamPage(id) {
    //route to teampage
    alert(id);
  }


  scrollToDiv() {

    $('html, body').animate({
      scrollTop: $("#section1").offset().top
    }, 1000);

  }



  search() {


    let game = $(".autocomplete").val();
    let parts[] = game.split(" ");
    let id = parts[0];



    if (parseInt(id)) {

      id = parseInt(id);
      let location = "evenement/" + id;

      this.router.navigate(['/evenement/', id]);

    }else{
      this.router.navigate(['/search/', game]);

    }





  }




  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/landing']);
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






}

