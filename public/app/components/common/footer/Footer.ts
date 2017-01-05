import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../../common/headers'


@Component({
	selector: 'subporterFooter',
	 template: `
	 
	 <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Subporter</h5>
                <p class="grey-text text-lighten-4">Subporter is het platform waar je jouw abonnement legaal kan uitlenen aan anderen.</p>
                <p class="grey-text text-lighten-4">Neem gerust contact met ons op</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!">Home</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Zoeken</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Login</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Abonnement aanbieden</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2017 Subporter
            <a class="grey-text text-lighten-4 right" href="#!"></a>
            </div>
          </div>
        </footer>
	 
	 `,
	  styleUrls: ['../../css/css/landing.css']
})

export class Footer {



}