import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Country } from '../../../../modules/Countries';
import { Competition } from '../../../../modules/Competitions';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'teams-create',
    templateUrl: './app/components/admin/teams/create/create.view.html'
})

export class TeamsCreate {
    name: String;
    stadion: String;
    street: String;
    number: Number;
    city: String;
    postal: Number;
    country: Number;
    price: Number;
    competition: Number;
    logo: File;
	background: File;
    countries: Array<Country> = [];
    competitions: Array<Competition> = [];

    constructor(public router: Router, public apiService: ApiService) { }

    ngOnInit() {
        this.loadValues();
    }

    loadValues() {
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

    loadCompetitions() {
        this.apiService.get(`api/competitions/country/${this.country}`).subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length != 0) {
                        let competitions: Array<Competition> = [];
                        data.forEach((i: any) => {
                            let competition: Competition = new Competition(i._id, i.country, i.description, i.logo, i.name, i.sport);
                            competitions.push(competition);
                        });
                        setTimeout(() => {
                            this.competitions = competitions;
                        }, 100);
                    }
                } else {
                    Materialize.toast("Unable to load competitions at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to load competitions at this time", 2000);
            }
        );
    }

    create(event) {
        let body = {
            name: this.name,
            stadion: this.stadion,
            street: this.street,
            number: this.number,
            city: this.city,
            postal: this.postal,
            country: this.country,
            price: this.price,
            competition: this.competition,
            logo: this.logo,
            background: this.background
        };

        this.apiService.postWithFiles("api/teams", body, (data) => {
            if (data) {
                this.router.navigate(['admin/teams']);
            } else {
                Materialize.toast("Unable to add a team at this time", 2000);
            }
        });
    }

    selectLogo(event) {
        let input = event.target;
        if (input && input.files[0]) {
            this.logo = input.files[0];
        }
    }

    selectBackground(event) {
        let input = event.target;
        if (input && input.files[0]) {
            this.background = input.files[0];
        }
    }
}