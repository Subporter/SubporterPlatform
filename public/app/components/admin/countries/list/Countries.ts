import { Component } from '@angular/core';
import { Materialize } from 'materialize-css';
import * as $ from 'jquery';

import { Country } from '../../../../modules/Countries';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'admin-countries',
    templateUrl: './app/components/admin/countries/list/countries.view.html'
})

export class AdminCountries {
    countries: Array<Country> = [];
    selectedCountry: Country;

    constructor(public apiService: ApiService) {

    }

    ngOnInit() {
        $('.modal').modal();
        this.apiService.get("api/countries").subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length !== 0) {
                        data.forEach((i: any) => {
                            let country: Country = new Country(i._id, i.name, i.featured);
                            this.countries.push(country);
                        });
                    }
                } else {
                    Materialize.toast("Unable to load countries at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to load countries at this time", 2000);
            }
        );
    }

    delete(id: Number) {
        this.selectedCountry = this.countries.filter(country => country._id === id)[0];
    }

    confirmDelete(id: Number) {
        this.apiService.delete(`api/countries/${id}`).subscribe(
            response => {
                let result = JSON.parse(response.text());
                Materialize.toast(result.info, 2000);
                if (result.success) {
                    this.countries = this.countries.filter(country => country._id !== id);
                }
            },
            error => {
                Materialize.toast("Unable to delete country at this time", 2000);
            }
        )
    }
}