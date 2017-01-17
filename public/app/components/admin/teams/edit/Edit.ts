import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Country } from '../../../../modules/Countries';
import { Competition } from '../../../../modules/Competitions';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'teams-edit',
    templateUrl: './app/components/admin/teams/edit/edit.view.html'
})

export class TeamsEdit {
    id: Number;
    name: String;
    stadion: String;
    street: String;
    number: Number;
    city: String;
    postal: Number;
    country: Number;
    price: Number;
    competition: Number;
    logoUrl: String;
    logo: File;
    backgroundUrl: String;
	background: File;
    countries: Array<Country> = [];
    competitions: Array<Competition> = [];
    sub: any;

    constructor(public router: Router, public route: ActivatedRoute, public apiService: ApiService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            if (!this.id) {
                this.router.navigate(['admin/teams']);
            }
        });
        this.loadTeam();
    }

    loadTeam() {
        this.apiService.get(`api/teams/${this.id}`).subscribe(
            response => {
                let result: any = JSON.parse(response.text());
                if (result.success) {
                    this.name = result.data.name;
                    this.stadion = result.data.stadion;
                    this.street = result.data.address.street;
                    this.number = result.data.address.number;
                    this.city = result.data.address.city;
                    this.postal = result.data.address.postal;
                    this.country = result.data.address.country._id;
                    this.price = result.data.price;
                    this.competition = result.data.competition._id;
                    this.logoUrl = result.data.logo;
                    this.backgroundUrl = result.data.background;
                    this.loadValues();
                } else {
                    this.router.navigate(['admin/competitions']);
                }
            },
            error => {
                this.router.navigate(['admin/competitions']);
            }
        );
    }

    loadValues() {
        this.apiService.get("api/countries").subscribe(
            response => {
                let result: any = JSON.parse(response.text());
                if (result.success) {
                    let data: any = result.data;
                    if (data.length != 0) {
                        let countries: Array<Country> = [];
                        data.forEach((i: any) => {
                            let country: Country = new Country(i._id, i.name, i.featured);
                            countries.push(country);
                        });
                        setTimeout(() => {
                            this.countries = countries;
                            this.loadCompetitions();
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

    edit(event: any) {
        let body: any = {
            name: this.name,
            stadion: this.stadion,
            street: this.street,
            number: this.number,
            city: this.city,
            postal: this.postal,
            country: this.country,
            price: this.price,
            competition: this.competition,
        };

        if (this.logo) {
            body.logo = this.logo;
        } else {
            body.logo = this.logoUrl;
        }

        if (this.background) {
            body.background = this.background;
        } else {
            body.background = this.backgroundUrl;
        }

        this.apiService.putWithFiles(`api/teams/${this.id}`, body, (data) => {
            if (data) {
                this.router.navigate(['admin/teams']);
            } else {
                Materialize.toast("Unable to edit this team at this time", 2000);
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