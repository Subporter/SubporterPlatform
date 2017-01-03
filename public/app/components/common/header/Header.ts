 import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../../common/headers'


@Component({
	selector: 'navmenu',
	 template: `


    <div class="header" [ngStyle]="{ 'background-image':  'url(../../../../img/'+image+')' }">
   
 
	 <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Subporter</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Info</a></li>
        <li><a href="badges.html">Zoeken</a></li>
        <li *ngIf="!loggedIn"><a  [routerLink]="['/login']">Login</a></li>
        <li *ngIf="loggedIn"><a  [routerLink]="['/profiel']">Profiel</a></li>

        <li><a class="waves-effect waves-light btn" (click)="search()">Abonnement aanbieden</a></li>
      </ul>
    </div>
  </nav>


<div class="container">
   <h1>{{header1}}</h1>
   <h2>{{header2}}</h2>

</div>
</div>
	 

	 
	 `,
	  styles: ['.header .container{ text-align: center;} .header .container h1{color: #fff;font-weight: 600;} .header{background-size: cover; height: 300px;}nav{background: none; -webkit-box-shadow: none; -moz-box-shadow: none;	box-shadow: none;}.brand-logo{margin-left: 10px;}']
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
 
 
 
 
 
 
 
 
 
 
