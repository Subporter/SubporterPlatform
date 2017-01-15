import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'subporter',
    template: `
        <main>
            <router-outlet></router-outlet>
        </main>
		<subporter-footer [hidden]="hideFooter"></subporter-footer>
	`
})

export class App {
    hideFooter: Boolean = false;

    constructor(public location: Location, public router: Router) {
        router.events.subscribe((url: any) => {
            this.footer();
        });
    }

    footer() {
        let routes: Array<String> = ['/login', '/register', '/404'],
            route: String = this.location.path(),
            inArray = routes.indexOf(route) > -1;

        this.hideFooter = inArray;
    }
};