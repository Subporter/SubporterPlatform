 import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { MaterializeAction, MaterializeDirective } from 'angular2/materialize';
import { contentHeaders } from '../../../common/headers'


@Component({
	selector: 'navmenu',
	 template: `


    <div class="header" [ngStyle]="{ 'background-image':  'url(../../../..'+image+')' }">
   
 
	 <nav>
    <div class="nav-wrapper">
      <a [routerLink]="['/']"  class="brand-logo">Subporter</a>
<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Info</a></li>
        <li> <a  [routerLink]="['/search']">Zoeken</a></li>
        <li *ngIf="loggedIn"><a  [routerLink]="['/cart']">Winkelwagen</a></li>

        <li *ngIf="!loggedIn"><a  [routerLink]="['/login']">Login</a></li>
        <li *ngIf="loggedIn"><a  [routerLink]="['/profiel']">Profile</a></li>

        <li><a class="waves-effect waves-light btn" [routerLink]="['/offer']">Abonnement aanbieden</a></li>
      </ul>
      <ul class="side-nav" id="mobile-demo">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>
  </nav>


<div class="container">
   <h1>{{header1}}</h1>
   <h2>{{header2}}</h2>

</div>
</div>
	 

	 
	 `,
	  styles: ['.header .container{ text-align: center;} .header .container h1{color: #fff;font-weight: 600; font-size:3em;} .header .container h2{color:#fff;font-size:2em;} .header{background-size: cover; height: 300px;}nav{background: none; -webkit-box-shadow: none; -moz-box-shadow: none;	box-shadow: none;}.brand-logo{margin-left: 10px;}']
})

export class Header {

  private loggedIn = false;

constructor(public router: Router, public http: Http) {

      this.loggedIn = !!localStorage.getItem('id_token');
	}

   @Input() header1:string;
   @Input() header2:string;
   @Input() image:string;


}

export class SideNav {
    private routeNames = ["Buttons", "Carousel", "Chips", "Collapsible", "Dialogs", "Dropdown", "Forms", "Tabs", "DatePicker", "ModelBindings"];
}
 
 
 
 
 
 
 
 
 
 
