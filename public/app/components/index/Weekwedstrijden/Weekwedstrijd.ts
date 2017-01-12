import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../../common/headers'


@Component({
	selector: 'weekwedstrijd',
	 template: `

      <span class="title">{{home}} - {{away}}</span>
      <p>{{date}}<br>
         {{location}}
      </p>
      <div class="secondary-content">
      <i class="fa fa-ticket fa-2x " aria-hidden="true"></i>
      <span>{{amount}}</span>
      </div>

	 `,
	  styleUrls: ['../../css/landing.css']
})

export class Weekwedstrijd {

    @Input() home:string;
    @Input() away:string;
    @Input() date:string;
    @Input() amount:number;
    @Input() location:string;


}