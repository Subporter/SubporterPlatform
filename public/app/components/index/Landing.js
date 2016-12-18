"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ng2_fullpage_1 = require("ng2-fullpage/ng2-fullpage");
// import * as $ from 'jquery';
// import '../../../../bower_components/slick-carousel/slick/slick';
var Landing = (function () {
    function Landing(fullpageService) {
        this.fullpageService = fullpageService;
    }
    //  ngOnInit() { $('.carousel-class').slick({ autoplay: false, dots: true, fade: true, arrows: false }); }
    Landing.prototype.search = function () {
        console.log("test");
    };
    Landing.prototype.test = function () {
        console.log("test");
    };
    return Landing;
}());
Landing = __decorate([
    core_1.Component({
        selector: 'landing',
        template: "\n\t\t <div mnFullpage\n            [mnFullpageNavigation]=\"false\" \n            [mnFullpageKeyboardScrolling]=\"true\"\n            [mnFullpageControlArrows]=\"false\"\n            [mnFullpageVerticalCentered]=\"false\"\n            [mnFullpageAutoScrolling]=\"false\"\n            [mnFullpageFitToSection]=\"false\">\n            <div class=\"section \" id=\"section0\">  \n\n    <nav>\n    <div class=\"nav-wrapper\">\n      <a href=\"#\" class=\"brand-logo\">Subporter</a>\n      <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n        <li><a href=\"sass.html\">Sass</a></li>\n        <li><a href=\"badges.html\">Components</a></li>\n        <li><a  [routerLink]=\"['/login']\">Login</a></li>\n        <li><a class=\"waves-effect waves-light btn\" (click)=\"search()\">Abonnement aanbieden</a></li>\n      </ul>\n    </div>\n  </nav>\n\n            <div class=\"container landingContainer \" >   \n\n\n             <h1>100% legaal voetbalabonnementen huren en verhuren</h1>\n\n            <form>\n            <div class=\"input-field\">\n    <input type=\"search\" id=\"search\" placeholder=\"Zoek naar wedstrijden en teams\"\n    required\n    name=\"q\"\n    [(ngModel)]=\"q\"/>\n          <label for=\"search\"><i class=\"material-icons\">search</i></label>\n    <select [(ngModel)]=\"s\" id=\"searchBar\" name=\"s\">\n        <option selected>Belgi\u00EB</option>\n        <option>Nederland</option>\n        <option>Duitsland</option>\n\n\n    </select>\n    <button class=\"btn waves-effect waves-light\"  (click)=\"search()\"> ZOEKEN </button>\n     </div>\n\n    </form>\n\n      <button class=\"btn-none\" (click)=\"fullpageService.moveSectionDown();\"><i class=\"fa fa-angle-down fa-5x\" aria-hidden=\"true\"></i></button>\n\n             </div>\n\n\n\n\n            </div>\n            <div class=\"section fp-auto-height\" data-anchor=\"section2\" id=\"section1\">    \n\n            <div class=\"container\">\n\n\n<h3>Topwedstrijden</h3>\n\n\n      \n             <div class=\"row\">\n        <div class=\"col s4\">\n          <div class=\"card\">\n            <div class=\"card-image\">\n              <img src=\"../../img/match1.png\">\n            </div>\n            <div class=\"card-content\">\n            <h6>Club Brugge kv - RSC Anderlecht</h6>\n              <p>28 februari 2017</p>\n            </div>\n            <div class=\"card-action\">\n                <a href=\"#\">Zoek abonnementen</a>\n            </div>\n          </div>\n        </div>\n\n            \n               <div class=\"col s4\">\n          <div class=\"card\">\n            <div class=\"card-image\">\n              <img src=\"../../img/match1.png\">\n            </div>\n            <div class=\"card-content\">\n            <h6>Club Brugge kv - RSC Anderlecht</h6>\n              <p>28 februari 2017</p>\n            </div>\n            <div class=\"card-action\">\n              <a href=\"#\">Zoek abonnementen</a>\n            </div>\n          </div>\n          </div>\n\n      \n            \n      \n         <div class=\"col s4\">\n          <div class=\"card\">\n            <div class=\"card-image\">\n              <img src=\"../../img/match1.png\">\n            </div>\n            <div class=\"card-content\">\n            <h6>Club Brugge kv - RSC Anderlecht</h6>\n              <p>28 februari 2017</p>\n            </div>\n            <div class=\"card-action\">\n              <a href=\"#\">Zoek abonnementen</a>\n            </div>\n          </div>\n          </div>\n\n      \n      \n       \n             <div class=\"col s6\">\n          <div class=\"card\">\n            <div class=\"card-image\">\n              <img src=\"../../img/match1.png\">\n            </div>\n            <div class=\"card-content\">\n            <h6>Club Brugge kv - RSC Anderlecht</h6>\n              <p>28 februari 2017</p>\n            </div>\n            <div class=\"card-action\">\n             <a href=\"#\">Zoek abonnementen</a>\n            </div>\n          </div>\n          </div>\n\n      \n   \n      \n       \n               <div class=\"col s6\">\n          <div class=\"card\">\n            <div class=\"card-image\">\n              <img src=\"../../img/match1.png\">\n            </div>\n            <div class=\"card-content\">\n            <h6>Club Brugge kv - RSC Anderlecht</h6>\n              <p>28 februari 2017</p>\n            </div>\n            <div class=\"card-action\">\n              <a href=\"#\">Zoek abonnementen</a>\n            </div>\n          </div>\n          </div>\n\n     \n      <div class=\"col s4\">\n          <div class=\"card\">\n            <div class=\"card-image\">\n              <img src=\"../../img/match1.png\">\n            </div>\n            <div class=\"card-content\">\n            <h6>Club Brugge kv - RSC Anderlecht</h6>\n              <p>28 februari 2017</p>\n            </div>\n            <div class=\"card-action\">\n               <a href=\"#\">Zoek abonnementen</a>\n            </div>\n          </div>\n          </div>\n\n  <div class=\"col s4\">\n          <div class=\"card\">\n            <div class=\"card-image\">\n              <img src=\"../../img/match1.png\">\n            </div>\n            <div class=\"card-content\">\n            <h6>Club Brugge kv - RSC Anderlecht</h6>\n              <p>28 februari 2017</p>\n            </div>\n            <div class=\"card-action\">\n                <a href=\"#\">Zoek abonnementen</a>\n            </div>\n          </div>\n          </div>\n\n\n  <div class=\"col s4\">\n          <div class=\"card\">\n            <div class=\"card-image\">\n              <img src=\"../../img/match1.png\">\n            </div>\n            <div class=\"card-content\">\n            <h6>Club Brugge kv - RSC Anderlecht</h6>\n              <p>28 februari 2017</p>\n            </div>\n            <div class=\"card-action\">\n              <a href=\"#\">Zoek abonnementen</a>\n            </div>\n          </div>\n          </div>\n\n\n\n    </div>\n\n    \n\n    <div class=\"center\">\n    <button class=\"btn center-align\"> Ontdek meer wedstrijden </button>\n    </div>\n\n    </div>\n            </div>\n            <div class=\"section  fp-auto-height\" id=\"section3\"  data-anchor=\"section3\">\n\n<div class=\"container\">\n\n<h3>Wedstrijden deze week</h3>\n\n\n<div class=\"row\">\n\n<div class=\"col s6\">\n\n\n              <ul class=\"collection\">\n    <li class=\"collection-item \" (click)=\"test()\">\n    \n      <span class=\"title\">Club Brugge kv - RSC Anderlecht</span>\n      <p>Zaterdag 24 december 2017<br>\n         Jan Breydelstadion, Brugge\n      </p>\n      <div class=\"secondary-content\">\n      <i class=\"fa fa-ticket fa-2x \" aria-hidden=\"true\"></i>\n      <span>12</span>\n      </div>\n    </li>\n    <li class=\"collection-item \">\n      <span class=\"title\">Club Brugge kv - RSC Anderlecht</span>\n      <p>Zaterdag 24 december 2017<br>\n         Jan Breydelstadion, Brugge\n      </p>\n       <div class=\"secondary-content\">\n      <i class=\"fa fa-ticket fa-2x \" aria-hidden=\"true\"></i>\n      <span>12</span>\n      </div>\n    </li>\n    <li class=\"collection-item \">\n      <span class=\"title\">Club Brugge kv - RSC Anderlecht</span>\n      <p>Zaterdag 24 december 2017<br>\n         Jan Breydelstadion, Brugge\n      </p>\n       <div class=\"secondary-content\">\n      <i class=\"fa fa-ticket fa-2x \" aria-hidden=\"true\"></i>\n      <span>12</span>\n      </div>\n\n    </li>\n    <li class=\"collection-item \">\n      <span class=\"title\">Club Brugge kv - RSC Anderlecht</span>\n      <p>Zaterdag 24 december 2017<br>\n         Jan Breydelstadion, Brugge\n      </p>\n       <div class=\"secondary-content\">\n      <i class=\"fa fa-ticket fa-2x \" aria-hidden=\"true\"></i>\n      <span>12</span>\n      </div>\n    </li>\n  </ul>\n\n  </div>\n\n  <div class=\"col s6\">\n\n         <ul class=\"collection\">\n    <li class=\"collection-item \">\n    \n      <span class=\"title\">Club Brugge kv - RSC Anderlecht</span>\n      <p>Zaterdag 24 december 2017<br>\n         Jan Breydelstadion, Brugge\n      </p>\n      <div class=\"secondary-content\">\n      <i class=\"fa fa-ticket fa-2x \" aria-hidden=\"true\"></i>\n      <span>12</span>\n      </div>\n    </li>\n    <li class=\"collection-item \">\n      <span class=\"title\">Club Brugge kv - RSC Anderlecht</span>\n      <p>Zaterdag 24 december 2017<br>\n         Jan Breydelstadion, Brugge\n      </p>\n   <div class=\"secondary-content\">\n      <i class=\"fa fa-ticket fa-2x \" aria-hidden=\"true\"></i>\n      <span>12</span>\n      </div>\n    </li>\n    <li class=\"collection-item \">\n      <span class=\"title\">Club Brugge kv - RSC Anderlecht</span>\n      <p>Zaterdag 24 december 2017<br>\n         Jan Breydelstadion, Brugge\n      </p>\n          <div class=\"secondary-content\">\n      <i class=\"fa fa-ticket fa-2x \" aria-hidden=\"true\"></i>\n      <span>12</span>\n      </div>\n\n    </li>\n    <li class=\"collection-item \">\n      <span class=\"title\">Club Brugge kv - RSC Anderlecht</span>\n      <p>Zaterdag 24 december 2017<br>\n         Jan Breydelstadion, Brugge\n      </p>\n       <div class=\"secondary-content\">\n      <i class=\"fa fa-ticket fa-2x \" aria-hidden=\"true\"></i>\n      <span>12</span>\n      </div>\n    </li>\n  </ul>\n\n</div>\n\n<div class=\"center\">\n    <button class=\"btn center-align\"> Meer wedstrijden vandaag </button>\n    </div>\n\n</div>\n\n\n\n</div>\n              \n            </div>\n            <div class=\"section fp-auto-height\" data-anchor=\"section4\" id=\"section4\">   \n\n\n<div class=\"container\">\n\n<h3>Dit zeggen anderen over Subporter</h3>\n\n\n\n<ul class=\"collection\">\n<div class=\"row\">\n\n<div class=\"col s4\">\n    <li class=\"collection-item avatar\">\n      <i class=\"material-icons circle\">folder</i>\n      <span class=\"title\">Niels Bril</span>\n      <p>\"Kheb weer 38 commits gedaan en 14934 lijnen code bijgevoegd in de afgelopen 3 minuten!\"<br>\n         \n      </p>\n    </li>\n    </div>\n    <div class=\"col s4\">\n    <li class=\"collection-item avatar\">\n      <i class=\"material-icons circle\">folder</i>\n      <span class=\"title\">Arno VDC</span>\n      <p>\" Ik ben dj VDC, volg mij op facebook enzo. \" <br>\n        \n      </p>\n    </li>\n    </div>\n    <div class=\"col s4\">\n    <li class=\"collection-item avatar\">\n      <i class=\"material-icons circle\">folder</i>\n      <span class=\"title\">Swaglexander</span>\n      <p>\"  #twaGank #yolo #dabnation #like4like \"<br>\n       \n      </p>\n    </li>\n    </div>\n   </div>\n\n  </ul>\n\n</div>\n\n\n\n\n\n\n            </div>\n            <div class=\"section fp-auto-height\" data-anchor=\"section5\">        \n\n\n <footer class=\"page-footer\">\n          <div class=\"container\">\n            <div class=\"row\">\n              <div class=\"col l6 s12\">\n                <h5 class=\"white-text\">Footer Content</h5>\n                <p class=\"grey-text text-lighten-4\">You can use rows and columns here to organize your footer content.</p>\n              </div>\n              <div class=\"col l4 offset-l2 s12\">\n                <h5 class=\"white-text\">Links</h5>\n                <ul>\n                  <li><a class=\"grey-text text-lighten-3\" href=\"#!\">Link 1</a></li>\n                  <li><a class=\"grey-text text-lighten-3\" href=\"#!\">Link 2</a></li>\n                  <li><a class=\"grey-text text-lighten-3\" href=\"#!\">Link 3</a></li>\n                  <li><a class=\"grey-text text-lighten-3\" href=\"#!\">Link 4</a></li>\n                </ul>\n              </div>\n            </div>\n          </div>\n          <div class=\"footer-copyright\">\n            <div class=\"container\">\n            \u00A9 2014 Copyright Text\n            <a class=\"grey-text text-lighten-4 right\" href=\"#!\">More Links</a>\n            </div>\n          </div>\n        </footer>\n\n\n            </div>\n        </div>\n\n\t",
        styleUrls: ['../../css/landing.css']
    }),
    __metadata("design:paramtypes", [ng2_fullpage_1.MnFullpageService])
], Landing);
exports.Landing = Landing;
//# sourceMappingURL=Landing.js.map