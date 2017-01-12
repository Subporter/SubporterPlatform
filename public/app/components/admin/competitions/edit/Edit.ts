import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Materialize } from 'materialize-css';

import { Sport } from '../../../../modules/Sports';
import { Country } from '../../../../modules/Countries';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'competitions-edit',
    templateUrl: './app/components/admin/competitions/edit/edit.view.html'
})

export class CompetitionsEdit {
    id: Number;
    name: String;
    description: String;
    sport: Number;
    country: Number;
    logoUrl: String;
    logo: File;
    sports: Array<Sport> = [];
    countries: Array<Country> = [];
    sub: any;

    constructor(public router: Router, public route: ActivatedRoute, public apiService: ApiService) { }

    ngOnInit() {
        this.sub= this.route.params.subscribe(params => {
            this.id = +params['id'];
            if (!this.id) {
                this.router.navigate(['admin/competitions']);
            }
        });
        this.loadCompetition();
        this.loadValues();
    }

    loadCompetition() {
        this.apiService.get(`api/competitions/${this.id}`).subscribe(
            response => {
                let result: any = JSON.parse(response.text());
                if (result.success) {
                    this.name = result.data.name;
                    this.description = result.data.description;
                    this.sport = result.data.sport._id;
                    this.country = result.data.country._id;
                    this.logoUrl = result.data.logo;
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
        this.apiService.get("api/sports").subscribe(
            response => {
                let result: any = JSON.parse(response.text());
                if (result.success) {
                    let data: any = result.data;
                    if (data.length != 0) {
                        let sports: Array<Sport> = [];
                        data.forEach((i: any) => {
                            let sport: Sport = new Sport(i._id, i.name);
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
                let result: any = JSON.parse(response.text());
                if (result.success) {
                    let data: any = result.data;
                    if (data.length != 0) {
                        let countries: Array<Country> = [];
                        data.forEach((i: any) => {
                            let country: Country = new Country(i._id, i.name);
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

    edit(event: any) {
        let body: any = {
            name: this.name,
            description: this.description,
            sport: this.sport,
            country: this.country
        };

        if (this.logo) {
            body.logo = this.logo;
        } else {
            body.logo = this.logoUrl;
        }

        this.apiService.putWithFiles(`api/competitions/${this.id}`, body, (data: any) => {
            if (data) {
                this.router.navigate(['admin/competitions']);
            } else {
                Materialize.toast("Unable to edit this competition at this time", 2000);
            }
        });
    }

    selectFile(event: any) {
        let input = event.target;
        if (input && input.files[0]) {
            this.logo = input.files[0];
        }
    }
}