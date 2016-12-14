import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers'
import { MnFullpageService} from "ng2-fullpage/ng2-fullpage";



@Component({
	selector: 'fullpageTest',
	template: `
		 <div mnFullpage
            [mnFullpageNavigation]="true" 
            [mnFullpageKeyboardScrolling]="true"
            [mnFullpageControlArrows]="false"
            [mnFullpageVerticalCentered]="false">
            <div class="section " id="section0">  


           

    <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Subporter</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a  [routerLink]="['/login']">JavaScript</a></li>
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
            <div class="section fp-auto-height" data-anchor="section2">    

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
              <a href="#">This is a link</a>
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
            <div class="section  fp-auto-height">
               gg
            </div>
            <div class="section fp-auto-height">        
              Some section 4
            </div>
        </div>

	`
})

export class Landing {

   

     constructor(private fullpageService: MnFullpageService) {
     }

search(){
    console.log("test");
  }


}