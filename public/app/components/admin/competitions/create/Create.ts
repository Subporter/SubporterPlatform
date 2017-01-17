import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Sport } from '../../../../modules/Sports';
import { Country } from '../../../../modules/Countries';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'competitions-create',
    templateUrl: './app/components/admin/competitions/create/create.view.html'
})

export class CompetitionsCreate {
    name: String;
    description: String;
    sport: Number;
    country: Number;
    logo: File;
    sports: Array<Sport> = [];
    countries: Array<Country> = [];

    constructor(public router: Router, public apiService: ApiService) { }

    ngOnInit() {
        this.loadValues();
    }

    loadValues() {
        this.apiService.get("api/sports").subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length != 0) {
                        let sports: Array<Sport> = [];
                        data.forEach((i: any) => {
                            let sport: Sport = new Sport(i._id, i.name, i.featured);
                            sports.push(sport);
                        });
                        setTimeout(() => {
                            this.sports = sports;
                        }, 100);
                    }
                } else {
                    Materialize.toast("Unable to load sports at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to load sports at this time", 2000);
            }
        );

        this.apiService.get("api/countries").subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length != 0) {
                        let countries: Array<Country> = [];
                        data.forEach((i: any) => {
                            let country: Country = new Country(i._id, i.name, i.featured);
                            countries.push(country);
                        });
                        setTimeout(() => {
                            this.countries = countries;
                        }, 100);
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

    create(event) {
        let body = {
            name: this.name,
            description: this.description,
            sport: this.sport,
            country: this.country,
            logo: this.logo
        };

        this.apiService.postWithFiles("api/competitions", body, (data) => {
            if (data) {
                this.router.navigate(['admin/competitions']);
            } else {
                Materialize.toast("Unable to add a competition at this time", 2000);
            }
        });
    }

    selectFile(event) {
        let input = event.target;
        if (input && input.files[0]) {
            this.logo = input.files[0];
        }
    }
}