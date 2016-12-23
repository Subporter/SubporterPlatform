import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import * as $ from 'jquery';
import 'slick';
import { Footer } from "../common/footer/Footer";

@Component({
	selector: 'landing',
	 templateUrl: './app/components/index/landing.view.html',
	  styleUrls: ['../../css/css/landing.css']
})

export class Landing {



ngOnInit() { $('.carousel-class').slick({  infinite: true, autoplay:true, arrows:false,
  slidesToShow: 12,
  slidesToScroll: 1 }); }

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

