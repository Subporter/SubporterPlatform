import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../../common/headers'


@Component({
	selector: 'subporter-header-admin',
	 template: `


    <nav>
    <div class="nav-wrapper">
      <a [routerLink]="['/']" class="brand-logo">Subporter</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li> <a  [routerLink]="['/search']">Zoeken</a></li>
        <li><a  [routerLink]="['/cart']">Winkelwagen</a></li>

        <li><a  [routerLink]="['/profile']">Profiel</a></li>

        <li><a  [routerLink]="['/admin']">Admin</a></li>

        <li><a class="waves-effect waves-light btn" [routerLink]="['/offer']" >Abonnement aanbieden</a></li>
      </ul>
    </div>
  </nav>




	 `,
	  styleUrls: ['../../../css/headerAdmin.css']
})

export class HeaderAdmin {


constructor(public router: Router, public http: Http) {

	}




}










