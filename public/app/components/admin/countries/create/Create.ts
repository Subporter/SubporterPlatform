import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Materialize } from 'materialize-css';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'countries-create',
    templateUrl: './app/components/admin/countries/create/create.view.html'
})

export class CountriesCreate {
    name: String = "";
    featured: Boolean = false;

    constructor(public router: Router, public apiService: ApiService) {

    }

    create(event) {
        let name = this.name,
            featured = this.name;

        let body = JSON.stringify({
            name,
            featured
        });

        this.apiService.post("api/countries", body).subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    this.router.navigate(['admin/countries']);
                } else {
                    Materialize.toast("Unable to add a country at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to add a country at this time", 2000);
            }
        );
    }
}