import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../../common/headers'


@Component({
	selector: 'topwedstrijd',
	 template: `

            <div class="card-image">
              <img src="{{gameImage}}">
            </div>
            <div class="card-content">
            <h6>{{home}} - {{away}}</h6>
              <p>{{date}}</p>
            </div>
            <div class="card-action">
                <a href="{{id}}">Zoek abonnementen</a>
            </div>

	 `,
	  styleUrls: ['../..css/landing.css']
})

export class Topwedstrijd {

    @Input() home:string;
    @Input() away:string;
    @Input() date:string;
    @Input() id:number;
    @Input() gameImage:string;





}