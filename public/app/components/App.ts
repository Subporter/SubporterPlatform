import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'subporter',
	template: `
		<div>
			<router-outlet></router-outlet>
		</div>
	`
})

export class App {};