import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Materialize } from 'materialize-css';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'countries-edit',
    templateUrl: './app/components/admin/countries/edit/edit.view.html'
})

export class CountriesEdit {
    id: Number;
	name: String = "";
    sub: any;

    constructor(public router: Router, public route: ActivatedRoute, public apiService: ApiService) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params["id"];
            this.apiService.get(`api/countries/${this.id}`).subscribe(
                response => {
                    let result = JSON.parse(response.text());
                    if (result.success) {
                        this.name = result.data.name;
                    } else {
                        this.router.navigate(['admin/countries']);
                    }
                },
                error => {
                    this.router.navigate(['admin/countries']);
                }
            )
        });
    }

    edit(event) {
        let name = this.name;

        let body = JSON.stringify({
            name
        });

        this.apiService.put(`api/countries/${this.id}`, body).subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    this.router.navigate(['admin/countries']);
                } else {
                    Materialize.toast("Unable to edit countries at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to edit countries at this time", 2000);
            }
        );
    }
}