import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers'
import { MnFullpageService} from "ng2-fullpage/ng2-fullpage";
import * as $ from 'jquery';
import 'slick';

@Component({
	selector: 'landing',
	template: `
		 <div mnFullpage
            [mnFullpageNavigation]="false"
            [mnFullpageKeyboardScrolling]="true"
            [mnFullpageControlArrows]="false"
            [mnFullpageVerticalCentered]="false"
            [mnFullpageAutoScrolling]="false"
            [mnFullpageFitToSection]="false">
            <div class="section " id="section0">

    <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Subporter</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a  [routerLink]="['/login']">Login</a></li>
        <li><a class="waves-effect waves-light btn" (click)="search()">Abonnement aanbieden</a></li>
      </ul>
    </div>
  </nav>

            <div class="container landingContainer " >


             <h1>100% legaal voetbalabonnementen huren en verhuren</h1>

            <form>
            <div class="input-field">
    <input type="search" id="search" placeholder="Zoek naar wedstrijden en teams"
    required
    name="q"
    [(ngModel)]="q"/>
          <label for="search"><i class="material-icons">search</i></label>
    <select [(ngModel)]="s" id="searchBar" name="s">
        <option selected>België</option>
        <option>Nederland</option>
        <option>Duitsland</option>


    </select>
    <button class="btn waves-effect waves-light"  (click)="search()"> ZOEKEN </button>
     </div>

    </form>

      <button class="btn-none" (click)="fullpageService.moveSectionDown();"><i class="fa fa-angle-down fa-5x" aria-hidden="true"></i></button>

             </div>




            </div>
            <div class="section fp-auto-height" data-anchor="section2" id="section1">

            <div class="container">


<h3>Topwedstrijden</h3>



             <div class="row">
        <div class="col s4">
          <div class="card">
            <div class="card-image">
              <img src="../../img/match1.png">
            </div>
            <div class="card-content">
            <h6>Club Brugge kv - RSC Anderlecht</h6>
              <p>28 februari 2017</p>
            </div>
            <div class="card-action">
                <a href="#">Zoek abonnementen</a>
            </div>
          </div>
        </div>


               <div class="col s4">
          <div class="card">
            <div class="card-image">
              <img src="../../img/match1.png">
            </div>
            <div class="card-content">
            <h6>Club Brugge kv - RSC Anderlecht</h6>
              <p>28 februari 2017</p>
            </div>
            <div class="card-action">
              <a href="#">Zoek abonnementen</a>
            </div>
          </div>
          </div>




         <div class="col s4">
          <div class="card">
            <div class="card-image">
              <img src="../../img/match1.png">
            </div>
            <div class="card-content">
            <h6>Club Brugge kv - RSC Anderlecht</h6>
              <p>28 februari 2017</p>
            </div>
            <div class="card-action">
              <a href="#">Zoek abonnementen</a>
            </div>
          </div>
          </div>




             <div class="col s6">
          <div class="card">
            <div class="card-image">
              <img src="../../img/match1.png">
            </div>
            <div class="card-content">
            <h6>Club Brugge kv - RSC Anderlecht</h6>
              <p>28 februari 2017</p>
            </div>
            <div class="card-action">
             <a href="#">Zoek abonnementen</a>
            </div>
          </div>
          </div>





               <div class="col s6">
          <div class="card">
            <div class="card-image">
              <img src="../../img/match1.png">
            </div>
            <div class="card-content">
            <h6>Club Brugge kv - RSC Anderlecht</h6>
              <p>28 februari 2017</p>
            </div>
            <div class="card-action">
              <a href="#">Zoek abonnementen</a>
            </div>
          </div>
          </div>


      <div class="col s4">
          <div class="card">
            <div class="card-image">
              <img src="../../img/match1.png">
            </div>
            <div class="card-content">
            <h6>Club Brugge kv - RSC Anderlecht</h6>
              <p>28 februari 2017</p>
            </div>
            <div class="card-action">
               <a href="#">Zoek abonnementen</a>
            </div>
          </div>
          </div>

  <div class="col s4">
          <div class="card">
            <div class="card-image">
              <img src="../../img/match1.png">
            </div>
            <div class="card-content">
            <h6>Club Brugge kv - RSC Anderlecht</h6>
              <p>28 februari 2017</p>
            </div>
            <div class="card-action">
                <a href="#">Zoek abonnementen</a>
            </div>
          </div>
          </div>


  <div class="col s4">
          <div class="card">
            <div class="card-image">
              <img src="../../img/match1.png">
            </div>
            <div class="card-content">
            <h6>Club Brugge kv - RSC Anderlecht</h6>
              <p>28 februari 2017</p>
            </div>
            <div class="card-action">
              <a href="#">Zoek abonnementen</a>
            </div>
          </div>
          </div>



    </div>



    <div class="center">
    <button class="btn center-align"> Ontdek meer wedstrijden </button>
    </div>

    </div>
            </div>
            <div class="section  fp-auto-height" id="section3"  data-anchor="section3">

<div class="container">

<h3>Wedstrijden deze week</h3>


<div class="row">

<div class="col s6">


              <ul class="collection">
    <li class="collection-item " (click)="test()">

      <span class="title">Club Brugge kv - RSC Anderlecht</span>
      <p>Zaterdag 24 december 2017<br>
         Jan Breydelstadion, Brugge
      </p>
      <div class="secondary-content">
      <i class="fa fa-ticket fa-2x " aria-hidden="true"></i>
      <span>12</span>
      </div>
    </li>
    <li class="collection-item ">
      <span class="title">Club Brugge kv - RSC Anderlecht</span>
      <p>Zaterdag 24 december 2017<br>
         Jan Breydelstadion, Brugge
      </p>
       <div class="secondary-content">
      <i class="fa fa-ticket fa-2x " aria-hidden="true"></i>
      <span>12</span>
      </div>
    </li>
    <li class="collection-item ">
      <span class="title">Club Brugge kv - RSC Anderlecht</span>
      <p>Zaterdag 24 december 2017<br>
         Jan Breydelstadion, Brugge
      </p>
       <div class="secondary-content">
      <i class="fa fa-ticket fa-2x " aria-hidden="true"></i>
      <span>12</span>
      </div>

    </li>
    <li class="collection-item ">
      <span class="title">Club Brugge kv - RSC Anderlecht</span>
      <p>Zaterdag 24 december 2017<br>
         Jan Breydelstadion, Brugge
      </p>
       <div class="secondary-content">
      <i class="fa fa-ticket fa-2x " aria-hidden="true"></i>
      <span>12</span>
      </div>
    </li>
  </ul>

  </div>

  <div class="col s6">

         <ul class="collection">
    <li class="collection-item ">

      <span class="title">Club Brugge kv - RSC Anderlecht</span>
      <p>Zaterdag 24 december 2017<br>
         Jan Breydelstadion, Brugge
      </p>
      <div class="secondary-content">
      <i class="fa fa-ticket fa-2x " aria-hidden="true"></i>
      <span>12</span>
      </div>
    </li>
    <li class="collection-item ">
      <span class="title">Club Brugge kv - RSC Anderlecht</span>
      <p>Zaterdag 24 december 2017<br>
         Jan Breydelstadion, Brugge
      </p>
   <div class="secondary-content">
      <i class="fa fa-ticket fa-2x " aria-hidden="true"></i>
      <span>12</span>
      </div>
    </li>
    <li class="collection-item ">
      <span class="title">Club Brugge kv - RSC Anderlecht</span>
      <p>Zaterdag 24 december 2017<br>
         Jan Breydelstadion, Brugge
      </p>
          <div class="secondary-content">
      <i class="fa fa-ticket fa-2x " aria-hidden="true"></i>
      <span>12</span>
      </div>

    </li>
    <li class="collection-item ">
      <span class="title">Club Brugge kv - RSC Anderlecht</span>
      <p>Zaterdag 24 december 2017<br>
         Jan Breydelstadion, Brugge
      </p>
       <div class="secondary-content">
      <i class="fa fa-ticket fa-2x " aria-hidden="true"></i>
      <span>12</span>
      </div>
    </li>
  </ul>

</div>

<div class="center">
    <button class="btn center-align"> Meer wedstrijden vandaag </button>
    </div>

</div>



</div>

            </div>
            <div class="section fp-auto-height" data-anchor="section4" id="section4">


<div class="container">

<h3>Dit zeggen anderen over Subporter</h3>



<ul class="collection">
<div class="row">

<div class="col s4">
    <li class="collection-item avatar">
      <i class="material-icons circle">folder</i>
      <span class="title">Niels Bril</span>
      <p>"Kheb weer 38 commits gedaan en 14934 lijnen code bijgevoegd in de afgelopen 3 minuten!"<br>

      </p>
    </li>
    </div>
    <div class="col s4">
    <li class="collection-item avatar">
      <i class="material-icons circle">folder</i>
      <span class="title">Arno VDC</span>
      <p>" Ik ben dj VDC, volg mij op facebook enzo. " <br>

      </p>
    </li>
    </div>
    <div class="col s4">
    <li class="collection-item avatar">
      <i class="material-icons circle">folder</i>
      <span class="title">Swaglexander</span>
      <p>"  #twaGank #yolo #dabnation #like4like "<br>

      </p>
    </li>
    </div>
   </div>

  </ul>

</div>






            </div>
            <div class="section fp-auto-height" data-anchor="section5">


 <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Footer Content</h5>
                <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2014 Copyright Text
            <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>


            </div>
        </div>

	`,
	  styleUrls: ['../../css/landing.css']
})

export class Landing {



     constructor(private fullpageService: MnFullpageService) {
     }

    ngOnInit() { $('.carousel-class').slick({ autoplay: false, dots: true, fade: true, arrows: false }); }

search(){
    console.log("test");
  }

  test(){
    console.log("test");
  }






}

