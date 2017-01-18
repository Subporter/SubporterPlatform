import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Materialize } from 'materialize-css';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'sports-create',
    templateUrl: './app/components/admin/sports/create/create.view.html'
})

export class SportsCreate {
    name: String = "";
    featured: Boolean = false;

    constructor(public router: Router, public apiService: ApiService) {

    }

    create(event) {
        let name = this.name,
            featured = this.featured;

        let body = JSON.stringify({
            name,
            featured
        });

        this.apiService.post("api/sports", body).subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    this.router.navigate(['admin/sports']);
                } else {
                    Materialize.toast("Unable to add a sport at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to add a sport at this time", 2000);
            }
        );
    }
}