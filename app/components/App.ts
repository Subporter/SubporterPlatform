import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'subporter',
	template: `
		<div class="container">
			<router-outlet></router-outlet>
		</div>
	`
})

export class App {
	constructor(public router: Router) { }
}