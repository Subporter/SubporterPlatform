import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/Headers'
import * as $ from 'jquery';
import 'slick';

@Component({
	selector: 'landing',
	 templateUrl: './app/components/index/landing.view.html',
	  styleUrls: ['../../css/landing.css']
})

export class Landing {



ngOnInit() { $('.carousel-class').slick({ autoplay: false, dots: true, fade: true, arrows: false }); }

search(){
    console.log("test");
  }

  test(){
    console.log("test");
  }


scrollToDiv(){

  $('html, body').animate({
        scrollTop: $("#section1").offset().top
    }, 1000);

}







}

